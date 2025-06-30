import pyshark
import requests
import time

API_URL = "http://localhost:5000/predict_realtime"

def extract_features(packet):
    try:
        # Simple feature simulation (replace with real mapping to your 40 features)
        return {
            "duration": 1.0,
            "src_bytes": int(packet.length),
            "protocol_type": 1 if packet.transport_layer == "TCP" else 2,
            # Add more mappings...
        }
    except Exception as e:
        print("Skip packet:", e)
        return None

def main():
    print("Listening to live packets...")
    capture = pyshark.LiveCapture(interface='Wi-Fi')

    for packet in capture.sniff_continuously():
        features = extract_features(packet)
        if features:
            try:
                response = requests.post(API_URL, json=features)
                result = response.json()
                print(f"[{time.strftime('%H:%M:%S')}] Prediction: {result['prediction']}")
            except Exception as e:
                print("Error:", e)

if __name__ == "__main__":
    main()
