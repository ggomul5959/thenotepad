var historyContainer = document.getElementById('history');

function clearDisplay() {
    document.getElementById('expression').value = '';
    document.getElementById('result').value = '';
}

function appendToDisplay(value) {
    var expression = document.getElementById('expression');
    var currentExpression = expression.value;

    // 사용자가 '='를 누른 후에는 새로운 수식을 입력하기 위해 기존 수식을 지웁니다.
    if (currentExpression.includes('=')) {
        expression.value = '';
    }

    expression.value += value;
}

function calculate() {
    var expression = document.getElementById('expression').value;
    try {
        var result = eval(expression);
        document.getElementById('result').value = result;
        // 계산식과 결과값을 저장하고 표시합니다.
        var historyItem = expression + ' = ' + result;
        historyContainer.innerHTML += '<div>' + historyItem + '</div>';
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}
