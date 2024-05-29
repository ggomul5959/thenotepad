document.getElementById('calculateButton').addEventListener('click', calculateBMI);

function calculateBMI() {
    var gender = document.getElementById('gender').value;
    var age = parseInt(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value) / 100; // cm를 m로 변환

    if (!weight || !height || !age) {
        document.getElementById('result').textContent = "Please enter valid values.";
        return;
    }

    var bmi = weight / (height * height);
    var bmiCategory = getBMICategory(bmi, gender, age);
    var advice = getBMIAdvice(bmi, gender, age);

    document.getElementById('result').textContent = "Your BMI: " + bmi.toFixed(2);
    document.getElementById('range').textContent = bmiCategory;
    document.getElementById('advice').textContent = advice;
}

function getBMICategory(bmi, gender, age) {
    if (age < 18) {
        if (bmi < 18.5) {
            return "Underweight (BMI < 18.5)";
        } else if (bmi >= 18.5 && bmi < 24) {
            return "Normal weight (18.5 ≤ BMI < 24)";
        } else if (bmi >= 24 && bmi < 30) {
            return "Overweight (24 ≤ BMI < 30)";
        } else {
            return "Obese (BMI ≥ 30)";
        }
    } else {
        if (gender === 'male') {
            if (bmi < 18.5) {
                return "Underweight (BMI < 18.5)";
            } else if (bmi >= 18.5 && bmi < 25) {
                return "Normal weight (18.5 ≤ BMI < 25)";
            } else if (bmi >= 25 && bmi < 30) {
                return "Overweight (25 ≤ BMI < 30)";
            } else {
                return "Obese (BMI ≥ 30)";
            }
        } else { // female
            if (bmi < 18.5) {
                return "Underweight (BMI < 18.5)";
            } else if (bmi >= 18.5 && bmi < 24) {
                return "Normal weight (18.5 ≤ BMI < 24)";
            } else if (bmi >= 24 && bmi < 30) {
                return "Overweight (24 ≤ BMI < 30)";
            } else {
                return "Obese (BMI ≥ 30)";
            }
        }
    }
}

function getBMIAdvice(bmi, gender, age) {
    if (age < 18) {
        if (bmi < 18.5) {
            return "Underweight: It's important to eat a balanced diet and consult with a healthcare provider to ensure you're getting the necessary nutrients.";
        } else if (bmi >= 18.5 && bmi < 24) {
            return "Normal weight: Keep maintaining a healthy diet and regular physical activity.";
        } else if (bmi >= 24 && bmi < 30) {
            return "Overweight: Consider adopting a healthier diet and regular exercise. Consult with a healthcare provider for personalized advice.";
        } else {
            return "Obese: It's important to consult with a healthcare provider for a comprehensive health plan, which may include diet, exercise, and other medical interventions.";
        }
    } else {
        if (gender === 'male') {
            if (bmi < 18.5) {
                return "Underweight: It's important to eat a balanced diet and consult with a healthcare provider to ensure you're getting the necessary nutrients.";
            } else if (bmi >= 18.5 && bmi < 25) {
                return "Normal weight: Keep maintaining a healthy diet and regular physical activity.";
            } else if (bmi >= 25 && bmi < 30) {
                return "Overweight: Consider adopting a healthier diet and regular exercise. Consult with a healthcare provider for personalized advice.";
            } else {
                return "Obese: It's important to consult with a healthcare provider for a comprehensive health plan, which may include diet, exercise, and other medical interventions.";
            }
        } else { // female
            if (bmi < 18.5) {
                return "Underweight: It's important to eat a balanced diet and consult with a healthcare provider to ensure you're getting the necessary nutrients.";
            } else if (bmi >= 18.5 && bmi < 24) {
                return "Normal weight: Keep maintaining a healthy diet and regular physical activity.";
            } else if (bmi >= 24 && bmi < 30) {
                return "Overweight: Consider adopting a healthier diet and regular exercise. Consult with a healthcare provider for personalized advice.";
            } else {
                return "Obese: It's important to consult with a healthcare provider for a comprehensive health plan, which may include diet, exercise, and other medical interventions.";
            }
        }
    }
}
