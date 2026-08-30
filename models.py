import os
import joblib
import pandas as pd


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


ML_PATH = os.path.join(
    BASE_DIR,
    "ml"
)


# Career Model

career_model = joblib.load(

    os.path.join(
        ML_PATH,
        "career_model.pkl"
    )

)


career_feature_encoders = joblib.load(

    os.path.join(
        ML_PATH,
        "career_feature_encoders.pkl"
    )

)


career_target_encoder = joblib.load(

    os.path.join(
        ML_PATH,
        "career_target_encoder.pkl"
    )

)


# Dropout Model

dropout_model = joblib.load(

    os.path.join(
        ML_PATH,
        "dropout_model.pkl"
    )

)


dropout_feature_encoders = joblib.load(

    os.path.join(
        ML_PATH,
        "dropout_feature_encoders.pkl"
    )

)


dropout_target_encoder = joblib.load(

    os.path.join(
        ML_PATH,
        "dropout_target_encoder.pkl"
    )

)


def predict_career(data):

    stream = data["stream"]


    stream_encoder = career_feature_encoders["stream"]


    stream_encoded = stream_encoder.transform(

        [stream]

    )[0]


    input_data = pd.DataFrame([{

        "stream": stream_encoded,

        "math_score": data["math_score"],

        "science_score": data["science_score"],

        "english_score": data["english_score"],

        "computer_score": data["computer_score"]

    }])


    prediction = career_model.predict(

        input_data

    )


    career = career_target_encoder.inverse_transform(

        prediction

    )[0]


    probabilities = career_model.predict_proba(

        input_data

    )


    confidence = max(

        probabilities[0]

    ) * 100


    return career, round(confidence, 2)



def predict_dropout(data):

    encoded_data = {}


    for column in [

        "financial_problem",

        "mental_stress",

        "internet_access",

        "parental_support",

        "family_income"

    ]:

        encoder = dropout_feature_encoders[column]

        encoded_data[column] = encoder.transform(

            [data[column]]

        )[0]


    input_data = pd.DataFrame([{

        "attendance": data["attendance"],

        "study_hours": data["study_hours"],

        "financial_problem":
            encoded_data["financial_problem"],

        "mental_stress":
            encoded_data["mental_stress"],

        "internet_access":
            encoded_data["internet_access"],

        "parental_support":
            encoded_data["parental_support"],

        "family_income":
            encoded_data["family_income"]

    }])


    prediction = dropout_model.predict(

        input_data

    )


    risk = dropout_target_encoder.inverse_transform(

        prediction

    )[0]


    probabilities = dropout_model.predict_proba(

        input_data

    )


    confidence = max(

        probabilities[0]

    ) * 100


    return risk, round(confidence, 2)