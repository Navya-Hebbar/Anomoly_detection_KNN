from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import pyshark
import threading
import asyncio
import requests

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load('data\\knn_model.pkl')  # Adjust path if needed

# --------------------- CSV PREDICTION ---------------------
@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    try:
        df = pd.read_csv(file)

        # Ensure columns match training data, possibly apply scaling/preprocessing if needed
        predictions = model.predict(df)
        
        # Return the actual class names (e.g., normal, neptune, smurf, etc.)
        readable_predictions = predictions.tolist()
        
        return jsonify({"predictions": readable_predictions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --------------------- REAL-TIME PACKET CAPTURE ---------------------
def extract_features_from_packet(packet):
    try:
        protocol = packet.transport_layer or "N/A"
        length = int(packet.length)
        src_port = int(packet[protocol].srcport) if protocol in packet else 0
        dst_port = int(packet[protocol].dstport) if protocol in packet else 0
        return [length, src_port, dst_port] + [0]*(model.n_features_in_ - 3)
    except Exception:
        return None

@app.route("/realtime", methods=["GET"])
def realtime_detect():
    results = []

    def capture_packets():


        asyncio.set_event_loop(asyncio.new_event_loop())  # ✅ Fix event loop issue
        try:
            capture = pyshark.LiveCapture(interface='Wi-Fi', bpf_filter='ip')  # 🔁 Change interface if needed
            for packet in capture.sniff_continuously(packet_count=10):
                features = extract_features_from_packet(packet)
                if features and len(features) == model.n_features_in_:
                    prediction = model.predict([features])[0]
                    label = "Anomaly" if prediction != "normal" and prediction != 0 else "Normal"
                    results.append({
                        "src_ip": packet.ip.src,
                        "dst_ip": packet.ip.dst,
                        "length": packet.length,
                        "prediction": label
                    })
        except Exception as e:
            results.append({"error": str(e)})

    thread = threading.Thread(target=capture_packets)
    thread.start()
    thread.join(timeout=5)

    return jsonify(results)

# --------------------- REAL-TIME FEATURE PREDICTION (For External JSON) ---------------------
API_URL = "http://localhost:5000/predict_realtime"
recent_predictions = []

def extract_features(packet):
    try:
        return {
            "duration": 1.0,
            "src_bytes": int(packet.length),
            "protocol_type": 1 if packet.transport_layer == "TCP" else 2,
        }
    except Exception as e:
        return {"error": str(e)}

def capture_packets_json():
    asyncio.set_event_loop(asyncio.new_event_loop())  # ✅ Fix event loop issue
    print("🔄 Starting packet capture...")
    capture = pyshark.LiveCapture(interface="Wi-Fi")  # 🔁 Change interface if needed

    for packet in capture.sniff_continuously():
        features = extract_features(packet)
        if features:
            try:
                response = requests.post(API_URL, json=features)
                if response.status_code == 200:
                    result = response.json()
                    prediction = result["prediction"]
                    recent_predictions.append({
                        "src_ip": packet.ip.src,
                        "dst_ip": packet.ip.dst,
                        "length": packet.length,
                        "prediction": prediction
                    })
                    if len(recent_predictions) > 10:
                        recent_predictions.pop(0)
                else:
                    recent_predictions.append({"error": f"API error {response.status_code}"})
            except Exception as e:
                recent_predictions.append({"error": str(e)})

# Start JSON feature-based packet capture in background
threading.Thread(target=capture_packets_json, daemon=True).start()

# --------------------- APP START ---------------------
if __name__ == "__main__":
    app.run(debug=True)
