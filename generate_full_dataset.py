import pandas as pd
import random

NUM_STUDENTS = 3000

careers = [
    "Software Engineer",
    "Doctor",
    "Data Scientist",
    "Teacher",
    "Business Manager",
    "Graphic Designer",
    "Lawyer",
    "Mechanical Engineer"
]

streams = ["Science", "Commerce", "Arts"]

data = []

for i in range(NUM_STUDENTS):

    name = f"Student_{i+1}"

    age = random.randint(16, 22)

    stream = random.choice(streams)

    math_score = random.randint(35, 100)
    science_score = random.randint(35, 100)
    english_score = random.randint(35, 100)
    computer_score = random.randint(30, 100)

    attendance = random.randint(40, 100)

    family_income = random.choice([
        "Low",
        "Medium",
        "High"
    ])

    study_hours = random.randint(1, 10)

    financial_problem = random.choice([
        "Yes",
        "No"
    ])

    mental_stress = random.choice([
        "Low",
        "Medium",
        "High"
    ])

    internet_access = random.choice([
        "Yes",
        "No"
    ])

    parental_support = random.choice([
        "Low",
        "Medium",
        "High"
    ])

    # Career Logic

    if computer_score > 75 and math_score > 70:
        career = random.choice([
            "Software Engineer",
            "Data Scientist"
        ])

    elif science_score > 80:
        career = "Doctor"

    elif english_score > 75 and stream == "Arts":
        career = random.choice([
            "Teacher",
            "Lawyer"
        ])

    elif stream == "Commerce":
        career = "Business Manager"

    elif computer_score > 70:
        career = "Graphic Designer"

    else:
        career = "Mechanical Engineer"

    # Dropout Risk Logic

    risk_score = 0

    if attendance < 60:
        risk_score += 2

    if study_hours < 3:
        risk_score += 2

    if financial_problem == "Yes":
        risk_score += 2

    if mental_stress == "High":
        risk_score += 2

    if parental_support == "Low":
        risk_score += 1

    if internet_access == "No":
        risk_score += 1

    if risk_score <= 2:
        dropout_risk = "Low"

    elif risk_score <= 5:
        dropout_risk = "Medium"

    else:
        dropout_risk = "High"

    data.append([
        name,
        age,
        stream,
        math_score,
        science_score,
        english_score,
        computer_score,
        attendance,
        family_income,
        study_hours,
        financial_problem,
        mental_stress,
        internet_access,
        parental_support,
        career,
        dropout_risk
    ])


columns = [
    "name",
    "age",
    "stream",
    "math_score",
    "science_score",
    "english_score",
    "computer_score",
    "attendance",
    "family_income",
    "study_hours",
    "financial_problem",
    "mental_stress",
    "internet_access",
    "parental_support",
    "recommended_career",
    "dropout_risk"
]

df = pd.DataFrame(data, columns=columns)

df.to_csv(
    "student_dataset.csv",
    index=False
)

print("Dataset generated successfully!")
print("Total students:", len(df))