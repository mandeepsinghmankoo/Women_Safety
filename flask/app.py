from flask import Flask, jsonify
from flask_cors import CORS
import subprocess


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Correct syntax

@app.route('/start-camera', methods=['GET'])
def start_camera():
    subprocess.Popen(["python3", "safety_detection.py"])
    return jsonify({"message": "Camera started successfully"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
