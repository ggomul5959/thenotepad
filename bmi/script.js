document.getElementById('calculateButton').addEventListener('click', calculateBMI);

function calculateBMI() {
    var gender = document.getElementById('gender').value;
    var age = parseInt(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value) / 100; // cm를 m로 변환

    if (!weight || !height || !age) {
        document.getElementById('result').textContent = "유효한 값을 입력하세요.";
        return;
    }

    var bmi = weight / (height * height);
    var bmiCategory = getBMICategory(bmi, gender, age);
    var advice = getBMIAdvice(bmi, gender, age);

    document.getElementById('result').textContent = "당신의 BMI: " + bmi.toFixed(2);
    document.getElementById('range').textContent = bmiCategory;
    document.getElementById('advice').textContent = advice;
}

function getBMICategory(bmi, gender, age) {
    if (age < 18) {
        if (bmi < 18.5) {
            return "저체중 (BMI < 18.5)";
        } else if (bmi >= 18.5 && bmi < 24) {
            return "정상 체중 (18.5 ≤ BMI < 24)";
        } else if (bmi >= 24 && bmi < 30) {
            return "과체중 (24 ≤ BMI < 30)";
        } else {
            return "비만 (BMI ≥ 30)";
        }
    } else {
        if (gender === 'male') {
            if (bmi < 18.5) {
                return "저체중 (BMI < 18.5)";
            } else if (bmi >= 18.5 && bmi < 25) {
                return "정상 체중 (18.5 ≤ BMI < 25)";
            } else if (bmi >= 25 && bmi < 30) {
                return "과체중 (25 ≤ BMI < 30)";
            } else {
                return "비만 (BMI ≥ 30)";
            }
        } else { // 여성
            if (bmi < 18.5) {
                return "저체중 (BMI < 18.5)";
            } else if (bmi >= 18.5 && bmi < 24) {
                return "정상 체중 (18.5 ≤ BMI < 24)";
            } else if (bmi >= 24 && bmi < 30) {
                return "과체중 (24 ≤ BMI < 30)";
            } else {
                return "비만 (BMI ≥ 30)";
            }
        }
    }
}

function getBMIAdvice(bmi, gender, age) {
    if (age < 18) {
        if (bmi < 18.5) {
            return "저체중: 균형 잡힌 식사를 하고 필요한 영양소를 충분히 섭취하기 위해 건강 전문가와 상담하세요.";
        } else if (bmi >= 18.5 && bmi < 24) {
            return "정상 체중: 건강한 식단과 규칙적인 신체 활동을 유지하세요.";
        } else if (bmi >= 24 && bmi < 30) {
            return "과체중: 더 건강한 식단과 규칙적인 운동을 고려하세요. 맞춤형 조언을 위해 건강 전문가와 상담하세요.";
        } else {
            return "비만: 종합적인 건강 계획을 위해 건강 전문가와 상담하는 것이 중요합니다. 여기에는 식단, 운동 및 기타 의료 개입이 포함될 수 있습니다.";
        }
    } else {
        if (gender === 'male') {
            if (bmi < 18.5) {
                return "저체중: 균형 잡힌 식사를 하고 필요한 영양소를 충분히 섭취하기 위해 건강 전문가와 상담하세요.";
            } else if (bmi >= 18.5 && bmi < 25) {
                return "정상 체중: 건강한 식단과 규칙적인 신체 활동을 유지하세요.";
            } else if (bmi >= 25 && bmi < 30) {
                return "과체중: 더 건강한 식단과 규칙적인 운동을 고려하세요. 맞춤형 조언을 위해 건강 전문가와 상담하세요.";
            } else {
                return "비만: 종합적인 건강 계획을 위해 건강 전문가와 상담하는 것이 중요합니다. 여기에는 식단, 운동 및 기타 의료 개입이 포함될 수 있습니다.";
            }
        } else { // 여성
            if (bmi < 18.5) {
                return "저체중: 균형 잡힌 식사를 하고 필요한 영양소를 충분히 섭취하기 위해 건강 전문가와 상담하세요.";
            } else if (bmi >= 18.5 && bmi < 24) {
                return "정상 체중: 건강한 식단과 규칙적인 신체 활동을 유지하세요.";
            } else if (bmi >= 24 && bmi < 30) {
                return "과체중: 더 건강한 식단과 규칙적인 운동을 고려하세요. 맞춤형 조언을 위해 건강 전문가와 상담하세요.";
            } else {
                return "비만: 종합적인 건강 계획을 위해 건강 전문가와 상담하는 것이 중요합니다. 여기에는 식단, 운동 및 기타 의료 개입이 포함될 수 있습니다.";
            }
        }
    }
}
