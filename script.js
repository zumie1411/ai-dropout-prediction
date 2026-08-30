let currentStep = 1;


/* =========================
   NAVIGATION
========================= */

function showSection(sectionId, button = null) {

    const sections = document.querySelectorAll(
        ".page-section"
    );

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    document.getElementById(sectionId)
        .classList.add("active-section");


    if (button) {

        document.querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.remove("active");

            });

        button.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   START ASSESSMENT
========================= */

function startAssessment() {

    showSection("assessment");

    currentStep = 1;

    updateStep();

}


/* =========================
   FORM STEPS
========================= */

function nextStep(step) {

    if (!validateStep(currentStep)) {
        return;
    }

    currentStep = step;

    updateStep();

}


function previousStep(step) {

    currentStep = step;

    updateStep();

}


function updateStep() {

    document
        .querySelectorAll(".form-step")
        .forEach(step => {

            step.classList.remove("active");

        });


    document
        .getElementById(`step${currentStep}`)
        .classList.add("active");


    const progress = (currentStep / 3) * 100;


    document
        .getElementById("progressFill")
        .style.width = `${progress}%`;


    document
        .getElementById("stepText")
        .innerText =
        `Step ${currentStep} of 3`;


    document
        .getElementById("progressPercent")
        .innerText =
        `${Math.round(progress)}%`;

}


/* =========================
   VALIDATION
========================= */

function validateStep(step) {

    let fields = [];


    if (step === 1) {

        fields = [
            "name",
            "age",
            "stream"
        ];

    }


    if (step === 2) {

        fields = [
            "math_score",
            "science_score",
            "english_score",
            "computer_score"
        ];

    }


    if (step === 3) {

        fields = [
            "attendance",
            "study_hours",
            "financial_problem",
            "mental_stress",
            "internet_access",
            "parental_support",
            "family_income"
        ];

    }


    for (const fieldId of fields) {

        const field =
            document.getElementById(fieldId);


        if (!field.value) {

            alert(
                "Please complete all required fields."
            );

            field.focus();

            return false;

        }

    }


    return true;

}


/* =========================
   ANALYZE STUDENT
========================= */

async function analyzeStudent() {


    if (!validateStep(3)) {
        return;
    }


    const data = {

        name:
            document.getElementById("name").value,

        age:
            Number(
                document.getElementById("age").value
            ),

        stream:
            document.getElementById("stream").value,


        math_score:
            Number(
                document.getElementById(
                    "math_score"
                ).value
            ),

        science_score:
            Number(
                document.getElementById(
                    "science_score"
                ).value
            ),

        english_score:
            Number(
                document.getElementById(
                    "english_score"
                ).value
            ),

        computer_score:
            Number(
                document.getElementById(
                    "computer_score"
                ).value
            ),


        attendance:
            Number(
                document.getElementById(
                    "attendance"
                ).value
            ),

        study_hours:
            Number(
                document.getElementById(
                    "study_hours"
                ).value
            ),


        financial_problem:
            document.getElementById(
                "financial_problem"
            ).value,


        mental_stress:
            document.getElementById(
                "mental_stress"
            ).value,


        internet_access:
            document.getElementById(
                "internet_access"
            ).value,


        parental_support:
            document.getElementById(
                "parental_support"
            ).value,


        family_income:
            document.getElementById(
                "family_income"
            ).value

    };


    const loadingModal =
        document.getElementById(
            "loadingModal"
        );


    loadingModal.classList.remove(
        "hidden"
    );


    try {


        const response = await fetch(

            "http://127.0.0.1:5000/predict",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(data)

            }

        );


        const result =
            await response.json();


        loadingModal.classList.add(
            "hidden"
        );


        if (result.success) {


            displayResults(result);


            showSection("dashboard");


            updateRecommendation(result);


        }

        else {

            alert(
                "Prediction Error: " +
                result.error
            );

        }


    }

    catch (error) {


        loadingModal.classList.add(
            "hidden"
        );


        console.error(error);


        alert(

            "Cannot connect to the backend.\n\n" +

            "Please make sure Flask is running:\n" +

            "python app.py"

        );

    }

}


/* =========================
   DISPLAY RESULTS
========================= */

function displayResults(result) {


    document.getElementById(
        "emptyDashboard"
    ).style.display = "none";


    document.getElementById(
        "resultDashboard"
    ).classList.remove("hidden");


    document.getElementById(
        "careerResult"
    ).innerText =
        result.predicted_career;


    document.getElementById(
        "careerConfidence"
    ).innerText =
        result.career_match_percentage + "%";


    document.getElementById(
        "riskResult"
    ).innerText =
        result.dropout_risk;


    document.getElementById(
        "riskConfidence"
    ).innerText =
        result.dropout_confidence + "%";

}


/* =========================
   AI RECOMMENDATION
========================= */

function updateRecommendation(result) {


    const risk =
        result.dropout_risk;


    const career =
        result.predicted_career;


    let recommendation = "";


    if (risk === "High") {

        recommendation =

            `Your AI analysis suggests a higher academic risk level. ` +

            `We recommend improving attendance, creating a regular study ` +

            `routine, and seeking guidance from teachers or mentors. ` +

            `Your recommended career path is ${career}.`;


    }

    else if (risk === "Medium") {

        recommendation =

            `Your academic profile shows some potential risk factors. ` +

            `Improving consistency in study habits and attendance can ` +

            `significantly improve your academic journey. ` +

            `Based on your strengths, ${career} is a suitable career direction.`;


    }

    else {

        recommendation =

            `Great! Your current academic profile indicates a lower dropout risk. ` +

            `Continue maintaining your study routine and academic engagement. ` +

            `The AI recommends exploring ${career} as a potential career path.`;


    }


    document.getElementById(
        "aiRecommendation"
    ).innerText =
        recommendation;

}


/* =========================
   LOAD STUDENTS
========================= */

async function loadStudents() {


    const studentList =
        document.getElementById(
            "studentList"
        );


    studentList.innerHTML =
        "<p>Loading records...</p>";


    try {


        const response = await fetch(

            "http://127.0.0.1:5000/students"

        );


        const data =
            await response.json();


        if (!data.success) {

            studentList.innerHTML =
                "<p>Unable to load records.</p>";

            return;

        }


        if (data.students.length === 0) {

            studentList.innerHTML =

                "<p>No student records found.</p>";

            return;

        }


        studentList.innerHTML = "";


        data.students.forEach(student => {


            const record =
                document.createElement("div");


            record.className =
                "student-record";


            record.innerHTML = `

                <h3>
                    ${student.name}
                </h3>

                <p>

                    Career:
                    <strong>
                        ${student.predicted_career}
                    </strong>

                </p>

                <p>

                    Dropout Risk:
                    <strong>
                        ${student.dropout_risk}
                    </strong>

                </p>

                <p>

                    Attendance:
                    ${student.attendance}%

                </p>

            `;


            studentList.appendChild(
                record
            );


        });


    }

    catch (error) {


        console.error(error);


        studentList.innerHTML =

            "<p>Cannot connect to backend.</p>";

    }

}
```
