import speech_recognition as sr
import webbrowser
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
import geocoder

# Function to get live GPS location
def get_live_location():
    try:
        g = geocoder.ip('me')  # First, try getting an approximate location
        if g.latlng:  
            return f"https://www.google.com/maps?q={g.latlng[0]},{g.latlng[1]}"
        
        # Use geopy if geocoder fails
        geolocator = Nominatim(user_agent="geoapiExercises")
        location = geolocator.geocode("current location", timeout=10)
        if location:
            return f"https://www.google.com/maps?q={location.latitude},{location.longitude}"
        
    except GeocoderTimedOut:
        return "Location unavailable (GPS timed out)"
    
    return "Location unavailable"

# Function to send WhatsApp message via Click to Chat with live location
def send_whatsapp_message():
    phone_number = "917973821198"  # Enter the WhatsApp number
    live_location = get_live_location()  # Get real-time location
    
    message = f"Emergency Alert: Help Needed. Please assist immediately.\nLive location: {live_location}"

    # Construct WhatsApp Click to Chat URL
    url = f"https://wa.me/{phone_number}?text={message}"
    
    # Open WhatsApp in the browser with the pre-filled message
    webbrowser.open(url)
    print(f"WhatsApp message with live location opened for {phone_number}")

# Function to recognize speech and detect the keyword
def listen_for_help():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    print("Listening for the keyword 'Jordan'...")

    while True:
        try:
            with microphone as source:
                recognizer.adjust_for_ambient_noise(source)  # Adjust for ambient noise
                print("Listening for emergency keyword...")

                audio = recognizer.listen(source)

                # Recognize speech using Google Speech Recognition
                try:
                    word = recognizer.recognize_google(audio).lower()
                    print(f"Detected word: {word}")

                    # Check if the keyword "Jordan" is detected
                    if "jordan" in word:
                        print("Emergency keyword detected!")
                        send_whatsapp_message()  # Send WhatsApp message with live location
                        break  # Exit after detecting the keyword
                except sr.UnknownValueError:
                    print("Could not understand audio")
                except sr.RequestError as e:
                    print(f"Could not request results; {e}")

        except Exception as e:
            print(f"Error: {e}")

# Main function to start the listening process
if __name__ == "__main__":
    listen_for_help()
