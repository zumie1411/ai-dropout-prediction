import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# Load dataset
df = pd.read_csv("student_dataset.csv")


# Features used for career prediction
features = [
    "stream",
    "math_score",
    "science_score",
    "english_score",
    "computer_score"
]

target = "recommended_career"


X = df[features].copy()
y = df[target].copy()


# Store encoders
feature_encoders = {}


# Encode stream
encoder = LabelEncoder()

X["stream"] = encoder.fit_transform(
    X["stream"]
)

feature_encoders["stream"] = encoder


# Encode career target
target_encoder = LabelEncoder()

y_encoded = target_encoder.fit_transform(y)


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42
)


# Train model
model = RandomForestClassifier(
    n_estimators=150,
    random_state=42
)

model.fit(
    X_train,
    y_train
)


# Test model
predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print("Career Model Accuracy:", accuracy)


# Save model
joblib.dump(
    model,
    "career_model.pkl"
)

joblib.dump(
    feature_encoders,
    "career_feature_encoders.pkl"
)

joblib.dump(
    target_encoder,
    "career_target_encoder.pkl"
)

print("Career model saved successfully!")