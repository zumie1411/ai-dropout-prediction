from flask import Flask, request, jsonify
from flask_cors import CORS

from database import (
    initialize_database,
    save_student,
    get_all_students
)

from models import (
    predict_career,
    predict_dropout
)


app = Flask(__name__)

CORS(app)


# Initialize database
initialize_database()


@app.route("/")
def home():

    return jsonify({

        "message":
        "AI Student Dropout Prediction API is running"

    })


# Prediction API
@app.route(
    "/predict",
    methods=["POST"]
)

def predict():

    try:

        data = request.json


        # Career prediction

        career, career_confidence = predict_career(

            data

        )


        # Dropout prediction

        dropout_risk, dropout_confidence = predict_dropout(

            data

        )


        # Save predictions

        data["predicted_career"] = career

        data["dropout_risk"] = dropout_risk


        save_student(data)


        return jsonify({

            "success": True,

            "predicted_career": career,

            "career_match_percentage":
                career_confidence,

            "dropout_risk":
                dropout_risk,

            "dropout_confidence":
                dropout_confidence

        })


    except Exception as error:

        return jsonify({

            "success": False,

            "error": str(error)

        }), 500



# Get saved students
@app.route(
    "/students",
    methods=["GET"]
)

def students():

    student_list = get_all_students()


    return jsonify({

        "success": True,

        "students": student_list

    })



if __name__ == "__main__":

    app.run(

        debug=True,

        host="0.0.0.0",

        port=5000

    )