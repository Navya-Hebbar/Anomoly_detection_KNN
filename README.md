---

# Anomaly Detector

A full-stack anomaly detection system using machine learning, featuring a Python Flask backend and a React.js frontend. The project is designed to detect anomalies in network traffic data, leveraging the NSL-KDD dataset.

## Features

- **Machine Learning Backend**: Trains and serves an anomaly detection model using the NSL-KDD dataset.
- **Real-time Detection**: Supports real-time anomaly detection via a dedicated endpoint.
- **Modern Frontend**: User-friendly React interface for uploading data, viewing predictions, and monitoring real-time results.
- **REST API**: Communicates between frontend and backend for predictions and data visualization.

---

## Project Structure

```
anomoly-detector/
  backend/           # Python Flask backend and ML code
    app.py           # Main Flask app
    realtime_detector.py  # Real-time detection logic
    data/            # Datasets and notebooks
  frontend/          # React.js frontend
    src/components/  # UI components
  README.md          # Project documentation
  flowchart.md       # (Optional) Project flowchart
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm

### Backend Setup

1. **Install dependencies**  
   Navigate to the backend directory and install required Python packages:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   *(If `requirements.txt` is missing, install Flask, pandas, scikit-learn, etc.)*

2. **Run the backend server**
   ```bash
   python app.py
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the frontend**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Upload Data**: Use the web interface to upload network traffic data for anomaly detection.
- **View Results**: See predictions and real-time detection results on the dashboard.
- **API Endpoints**: Interact with the backend via REST API for custom integrations.

---

## Datasets

- Uses the [NSL-KDD dataset] for training.

---

## Folder Details

- `backend/data/`: Contains datasets and Jupyter notebooks for model training.
- `backend/app.py`: Main Flask application.
- `backend/realtime_detector.py`: Real-time detection logic.
- `frontend/`: React app source code and UI components.

---

## Snapshots
![image](https://github.com/user-attachments/assets/1a6165b3-cab9-48e4-85dc-7dcb48a1b906)
![image](https://github.com/user-attachments/assets/c42f06cf-e9b0-4fbe-8f3b-e3b3fc59817a)
![image](https://github.com/user-attachments/assets/d34cbda6-6b31-472b-b8e0-b00319cc59be)
![image](https://github.com/user-attachments/assets/e3057923-a4a7-437e-aa03-4c8df7d34db5)
![image](https://github.com/user-attachments/assets/cc256228-f820-4a46-b7f0-cb95c0f19b27)

