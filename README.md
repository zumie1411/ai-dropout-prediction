# AI Dropout Prediction

An AI-powered student analysis system that predicts:

- Recommended Career
- Career Match Percentage
- Student Dropout Risk
- Prediction Confidence

## Technologies Used

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Python
- Flask

Machine Learning:
- Scikit-learn
- Random Forest

Database:
- SQLite

## Installation

Install dependencies:

pip install -r backend/requirements.txt

Generate dataset:

cd ml
python generate_full_dataset.py

Train career model:

python train_career_from_full.py

Train dropout model:

python train_dropout_from_full.py

Run backend:

cd ../backend
python app.py