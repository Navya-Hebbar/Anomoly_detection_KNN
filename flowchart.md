# Network Anomaly Detection System Flowchart

```mermaid
flowchart TD
    subgraph "Frontend (React)"
        A[User Interface] --> B[Home Page]
        B --> C1[CSV Upload]
        B --> C2[Real-time Analysis]
        C1 --> D1[File Processing]
        C2 --> D2[Live Packet Visualization]
        D1 --> E1[Results Display]
        D2 --> E2[Real-time Dashboard]
    end

    subgraph "Backend (Flask)"
        F[API Endpoints] --> G1[CSV Prediction]
        F --> G2[Real-time Detection]
        G1 --> H1[Data Preprocessing]
        G2 --> H2[Packet Capture]
        H1 --> I1[KNN Model Prediction]
        H2 --> I2[Feature Extraction]
        I2 --> I1
        I1 --> J[Results Generation]
    end

    subgraph "Data Processing"
        K[Training Data] --> L[Feature Selection]
        L --> M[Model Training]
        M --> N[Model Serialization]
        N --> I1
    end

    D1 -->|HTTP Request| G1
    D2 -->|Polling| G2
    J -->|JSON Response| E1
    J -->|JSON Response| E2