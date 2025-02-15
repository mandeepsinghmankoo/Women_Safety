import cv2
import numpy as np
import torch
import threading
import time
import logging
import csv
import os
import geocoder
from datetime import datetime
from playsound import playsound
from ultralytics import YOLO
import mediapipe as mp

# Setup logging
logging.basicConfig(filename='alerts.log', level=logging.INFO, format='%(asctime)s - %(message)s')

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

# Load Gender Classification Model
gender_net = cv2.dnn.readNet(
    r'C:\Users\91628\Documents\Gender-Detection-master\gender_net.caffemodel',
    r'C:\Users\91628\Documents\Gender-Detection-master\gender_deploy.prototxt'
)
gender_list = ['Male', 'Female']

# MediaPipe Hands for SOS Gesture
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)
mp_drawing = mp.solutions.drawing_utils

# Path to Incident Reports
incident_report_file = "incident_reports.csv"

# Function to Play Alert Sound
def play_alert_sound():
    playsound(r"C:\Users\91628\Documents\Gender-Detection-master\700-hz-beeps-86815.mp3")

# Function to Check Nighttime
def is_nighttime():
    current_hour = datetime.now().hour
    return current_hour < 6 or current_hour >= 18

# Function to Get Location
def get_location():
    g = geocoder.ip('me')
    return (g.latlng, g.city) if g.ok else (None, "Unknown")

# Function to Log Incidents
def log_incident(incident_type, location):
    file_exists = os.path.isfile(incident_report_file)
    with open(incident_report_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(["Date", "Time", "Incident Type", "Location", "Coordinates"])
        date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S').split(" ")
        writer.writerow([date_time[0], date_time[1], incident_type, location[1], location[0]])

# Function to Detect SOS Gesture
def detect_sos_gesture(frame):
    result = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    sos_detected = False
    if result.multi_hand_landmarks:
        for hand_landmarks in result.multi_hand_landmarks:
            mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            thumb_tip = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP]
            index_tip = hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP]
            if abs(thumb_tip.x - index_tip.x) < 0.02 and abs(thumb_tip.y - index_tip.y) < 0.02:
                sos_detected = True
                cv2.putText(frame, "🚨 SOS Gesture Detected!", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
    return frame, sos_detected

# Function to Detect People & Classify Gender
def detect_person_and_gender(frame):
    results = model(frame)
    height, width, _ = frame.shape
    genders = []

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            confidence = box.conf[0].item()
            cls = int(box.cls[0].item())

            # Clamp Bounding Box within Frame
            x1, y1, x2, y2 = max(0, x1), max(0, y1), min(width - 1, x2), min(height - 1, y2)

            # *Limit the box size* to avoid going out of frame
            max_size = min(width, height) // 3  
            if (x2 - x1) > max_size:
                x_center = (x1 + x2) // 2
                x1, x2 = max(0, x_center - max_size // 2), min(width - 1, x_center + max_size // 2)
            if (y2 - y1) > max_size:
                y_center = (y1 + y2) // 2
                y1, y2 = max(0, y_center - max_size // 2), min(height - 1, y_center + max_size // 2)

            if confidence > 0.5 and cls == 0:
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                cv2.putText(frame, f"Person ({confidence:.2f})", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

                # Gender Classification
                if x2 > x1 and y2 > y1:
                    person_roi = frame[y1:y2, x1:x2]
                    if person_roi.size > 0:
                        blob = cv2.dnn.blobFromImage(person_roi, 1.0, (227, 227), (104, 117, 123), swapRB=False)
                        gender_net.setInput(blob)
                        gender_preds = gender_net.forward()
                        gender = gender_list[gender_preds[0].argmax()]
                        genders.append(gender)
                        cv2.putText(frame, f"Gender: {gender}", (x1, min(y2 + 20, height - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return frame, genders

# Main Video Capture
cap = cv2.VideoCapture(0)
location_coords, location_city = get_location()

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame, genders = detect_person_and_gender(frame)
    frame, sos_detected = detect_sos_gesture(frame)

    num_males = genders.count("Male")
    num_females = genders.count("Female")
    
    alert_triggered = False  

    # 🚨 Condition 1: Woman Alone at Night (Exactly One Woman, No Males)
    if not alert_triggered and is_nighttime() and num_females == 1 and num_males == 0:
        alert_message = f"🚨 Woman Alone at Night in {location_city}!"
        cv2.putText(frame, alert_message, (50, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
        threading.Thread(target=play_alert_sound).start()
        log_incident("Woman Alone at Night", (location_coords, location_city))
        alert_triggered = True

    # 🚨 Condition 2: SOS Gesture Detected
    if not alert_triggered and sos_detected:
        threading.Thread(target=play_alert_sound).start()
        log_incident("SOS Gesture Detected", (location_coords, location_city))
        alert_triggered = True

    # 🚨 Condition 3: One Woman Surrounded by More Than One Male
    if not alert_triggered and num_females == 1 and num_males > 1:
        alert_message = f"🚨 1 Female Surrounded by {num_males} Males!"
        cv2.putText(frame, alert_message, (50, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)
        threading.Thread(target=play_alert_sound).start()
        log_incident(f"1 Female with {num_males} Males", (location_coords, location_city))
        alert_triggered = True

    cv2.imshow("Safety Detection System", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()