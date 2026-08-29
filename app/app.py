from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "career_advisor_secret_key"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///career.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# ---------------- USER DATABASE ----------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(100), unique=True, nullable=False)

    password = db.Column(db.String(200), nullable=False)


# ---------------- CREATE DATABASE ----------------

with app.app_context():
    db.create_all()


# ---------------- LOGIN PAGE ----------------

@app.route("/")
def home():

    if "user_id" in session:
        return redirect(url_for("dashboard"))

    return redirect(url_for("login"))


# ---------------- REGISTER ----------------

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        existing_user = User.query.filter_by(username=username).first()

        if existing_user:
            return "Username already exists!"

        hashed_password = generate_password_hash(password)

        new_user = User(
            username=username,
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for("login"))

    return render_template("register.html")


# ---------------- LOGIN ----------------

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form["username"]
        password = request.form["password"]

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):

            session["user_id"] = user.id
            session["username"] = user.username

            return redirect(url_for("dashboard"))

        return "Invalid Username or Password!"

    return render_template("login.html")


# ---------------- DASHBOARD ----------------

@app.route("/dashboard")
def dashboard():

    if "user_id" not in session:
        return redirect(url_for("login"))

    return render_template(
        "dashboard.html",
        username=session["username"]
    )


# ---------------- ASSESSMENT ----------------

@app.route("/assessment", methods=["GET", "POST"])
def assessment():

    if "user_id" not in session:
        return redirect(url_for("login"))

    if request.method == "POST":

        answers = {
            "coding": int(request.form["coding"]),
            "math": int(request.form["math"]),
            "design": int(request.form["design"]),
            "communication": int(request.form["communication"]),
            "problem_solving": int(request.form["problem_solving"]),
            "technology": int(request.form["technology"])
        }

        careers = calculate_career_match(answers)

        return render_template(
            "result.html",
            careers=careers
        )

    return render_template("assessment.html")


# ---------------- AI CAREER ALGORITHM ----------------

def calculate_career_match(answers):

    career_scores = {

        "Software Developer": (
            answers["coding"] * 0.30 +
            answers["problem_solving"] * 0.25 +
            answers["technology"] * 0.25 +
            answers["math"] * 0.20
        ),

        "Data Scientist": (
            answers["math"] * 0.35 +
            answers["coding"] * 0.25 +
            answers["problem_solving"] * 0.25 +
            answers["technology"] * 0.15
        ),

        "UI/UX Designer": (
            answers["design"] * 0.50 +
            answers["technology"] * 0.20 +
            answers["communication"] * 0.20 +
            answers["problem_solving"] * 0.10
        ),

        "Cybersecurity Analyst": (
            answers["technology"] * 0.35 +
            answers["problem_solving"] * 0.30 +
            answers["coding"] * 0.20 +
            answers["math"] * 0.15
        ),

        "Business Analyst": (
            answers["communication"] * 0.35 +
            answers["problem_solving"] * 0.30 +
            answers["math"] * 0.20 +
            answers["technology"] * 0.15
        )
    }

    results = []

    for career, score in career_scores.items():

        percentage = round((score / 5) * 100, 2)

        results.append({
            "career": career,
            "percentage": percentage
        })

    results.sort(
        key=lambda x: x["percentage"],
        reverse=True
    )

    return results


# ---------------- LOGOUT ----------------

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("login"))


# ---------------- RUN APP ----------------

if __name__ == "__main__":
    app.run(debug=True)