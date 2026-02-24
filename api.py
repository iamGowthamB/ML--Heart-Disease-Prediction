from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="CardioLens Pro API",
    description="API for Heart Disease Prediction Model",
    version="2.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model and Scaler
MODEL_PATH = 'c:/Project/CrossValidation-RandomForest/rf_model.pkl'
SCALER_PATH = 'c:/Project/CrossValidation-RandomForest/scaler.pkl'

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("Model and Scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    model = None
    scaler = None

# Define Input Schema
class PatientData(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int = 0
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int
    bmi: float
    smoker: int
    famhist: int

@app.get("/")
def read_root():
    return {"status": "online", "message": "CardioLens Pro API is running"}

@app.post("/predict")
def predict(data: PatientData):
    if not model or not scaler:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        # Convert input to DataFrame (matching model training format)
        input_dict = data.dict()
        df_in = pd.DataFrame([input_dict])
        
        # Scale Data
        scaled_data = scaler.transform(df_in)
        
        # Predict
        prediction = model.predict(scaled_data)[0]
        probability = model.predict_proba(scaled_data)[0][1]

        return {
            "prediction": int(prediction),
            "probability": float(probability),
            "risk_level": "High" if probability > 0.5 else "Low"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
