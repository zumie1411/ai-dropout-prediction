import sqlite3
import os


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


DATABASE_PATH = os.path.join(
    BASE_DIR,
    "database",
    "student_dropout.db"
)


def get_connection():

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    connection.row_factory = sqlite3.Row

    return connection


def initialize_database():

    connection = get_connection()

    cursor = connection.cursor()


    cursor.execute("""

    CREATE TABLE IF NOT EXISTS students (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT,

        age INTEGER,

        stream TEXT,

        math_score INTEGER,

        science_score INTEGER,

        english_score INTEGER,

        computer_score INTEGER,

        attendance INTEGER,

        study_hours INTEGER,

        financial_problem TEXT,

        mental_stress TEXT,

        internet_access TEXT,

        parental_support TEXT,

        family_income TEXT,

        predicted_career TEXT,

        dropout_risk TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )

    """)


    connection.commit()

    connection.close()


def save_student(data):

    connection = get_connection()

    cursor = connection.cursor()


    cursor.execute("""

    INSERT INTO students (

        name,
        age,
        stream,
        math_score,
        science_score,
        english_score,
        computer_score,
        attendance,
        study_hours,
        financial_problem,
        mental_stress,
        internet_access,
        parental_support,
        family_income,
        predicted_career,
        dropout_risk

    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    """, (

        data["name"],
        data["age"],
        data["stream"],
        data["math_score"],
        data["science_score"],
        data["english_score"],
        data["computer_score"],
        data["attendance"],
        data["study_hours"],
        data["financial_problem"],
        data["mental_stress"],
        data["internet_access"],
        data["parental_support"],
        data["family_income"],
        data["predicted_career"],
        data["dropout_risk"]

    ))


    connection.commit()

    connection.close()


def get_all_students():

    connection = get_connection()

    cursor = connection.cursor()


    cursor.execute(

        "SELECT * FROM students ORDER BY id DESC"

    )


    students = cursor.fetchall()


    connection.close()


    return [

        dict(student)

        for student in students

    ]