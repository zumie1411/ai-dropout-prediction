import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# Load dataset
df = pd.read_csv(
    "student_dataset.csv"
)


features = [
    "attendance",
    "study_hours",
    "financial_problem",
    "mental_stress",
    "internet_access",
    "parental_support",
    "family_income"
]


target = "dropout_risk"


X = df[features].copy()

y = df[target].copy()


feature_encoders = {}


# Categorical columns
categorical_columns = [
    "financial_problem",
    "mental_stress",
    "internet_access",
    "parental_support",
    "family_income"
]


for column in categorical_columns:

    encoder = LabelEncoder()

    X[column] = encoder.fit_transform(
        X[column]
    )

    feature_encoders[column] = encoder


# Target encoder
target_encoder = LabelEncoder()

y_encoded = target_encoder.fit_transform(y)


# Split
X_train, X_test, y_train, y_test = train_test_split(

    X,
    y_encoded,

    test_size=0.2,

    random_state=42
)


# Model
model = RandomForestClassifier(

    n_estimators=200,

    random_state=42
)


# Train
model.fit(
    X_train,
    y_train
)


# Predict
predictions = model.predict(
    X_test
)


accuracy = accuracy_score(
    y_test,
    predictions
)


print("Dropout Model Accuracy:", accuracy)


# Save
joblib.dump(
    model,
    "dropout_model.pkl"
)

joblib.dump(
    feature_encoders,
    "dropout_feature_encoders.pkl"
)

joblib.dump(
    target_encoder,
    "dropout_target_encoder.pkl"
)


print("Dropout model saved successfully!")