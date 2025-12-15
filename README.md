# 🪐 Asteroids Diameter Prediction 

End-to-end **machine learning + API + frontend** project for predicting asteroid diameters from physical and orbital features.

This repository is intentionally focused on **production-oriented implementation**.

---

## 🔧 Tech Stack

* **Python + scikit-learn** (Machine Learning Model)
* **Pandas + NumPy** (EDA and feature preparation)
* **FastAPI** (Backend API)
* **React + Vite + TailwindCSS** (Frontend web app)
* **Joblib** (model serialization)

---

## 📌 Overview

This project builds a regression model to estimate asteroid diameter (km) using:
This project builds a regression model to estimate asteroid diameter (km) using the [Kaggle Asteroids dataset](https://www.kaggle.com/datasets/sakhawat18/asteroid-dataset), which aggregates publicly available asteroid observations. The model leverages physically meaningful features, including:
* Absolute magnitude
* Albedo
* Orbital parameters (eccentricity, inclination, perihelion, aphelion, mean motion)
* Binary flags: Near-Earth Object (NEO) and Potentially Hazardous Asteroid (PHA)

---

## 📊 Analysis Notebook

**`notebooks/asteroid_diameter_analysis.ipynb`** contains:

* Data cleaning and EDA
* Feature transformations
* Model comparison and selection

Notebook outputs were cleared before committing.

---

## 🌐 API (FastAPI)

A lightweight inference service exposing a prediction endpoint.

**Key details:**

* Strict input validation
* Physically meaningful value constraints
* Output clamping to avoid invalid predictions

Example request:

```json
{
  "absolute_magnitude": 19.2,
  "albedo": 0.14,
  "eccentricity": 0.32,
  "inclination": 12.5,
  "perihelion_distance": 0.9,
  "aphelion_distance": 2.1,
  "mean_motion": 0.23,
  "is_neo": true,
  "is_pha": false
}
```

---

## 🖥️ Frontend

* Interactive numeric inputs with valid ranges
* Toggle switches for NEO / PHA flags
* Feature-level tooltips
* Clean visualization of predicted diameter


![Frontend UI](/public/app_frontend.png)


---

## 📂 Repository Structure

```
├── notebooks/          # EDA and modeling
├── backend/            # FastAPI inference service
├── frontend/           # React UI
└── README.md
```