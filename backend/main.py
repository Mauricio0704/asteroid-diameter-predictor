from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Asteroid prediction API running"}


model = joblib.load("model/final_model.joblib")


class AsteroidInput(BaseModel):
    is_neo: str
    is_pha: str
    absolute_magnitude: float
    albedo: float
    eccentricity: float
    perihelion_distance: float
    inclination: float
    aphelion_distance: float
    mean_motion: float
    class_: str


@app.post("/predict")
def predict(input: AsteroidInput):

    data = {
        "is_neo": input.is_neo,
        "is_pha": input.is_pha,
        "absolute_magnitude": input.absolute_magnitude,
        "albedo": input.albedo,
        "eccentricity": input.eccentricity,
        "perihelion_distance": input.perihelion_distance,
        "inclination": input.inclination,
        "aphelion_distance": input.aphelion_distance,
        "mean_motion": input.mean_motion,
        "class_": input.class_,
    }

    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]

    return {"diameter_prediction": round(float(prediction), 3)}
