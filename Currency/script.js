var tipsByType = {
    '매우 만족': [],
    '만족': [],
    '보통': [],
    '불만족': []
};

function calculateTip() {
    var totalBill = parseFloat(document.getElementById("totalBill").value);
    var tipPercentage = parseFloat(document.getElementById("tipPercentage").value);
    var tipType = document.getElementById("tipType").value;

    if (isNaN(totalBill) || isNaN(tipPercentage)) {
        alert("Please enter valid numbers.");
        return;
    }

    var tipAmount = totalBill * (tipPercentage / 100);
    var totalAmount = totalBill + tipAmount;

    tipsByType[tipType].push(tipPercentage);

    var averageTip = calculateAverageTip(tipsByType[tipType]);

    document.getElementById("팁 금액").innerHTML = "Tip: $" + tipAmount.toFixed(2) + "<br>Total Amount: $" + totalAmount.toFixed(2);
    document.getElementById("평균 팁").innerHTML = tipType + " Average Tip: " + averageTip.toFixed(2) + "%";
}

function calculateAverageTip(tipArray) {
    var total = 0;
    for (var i = 0; i < tipArray.length; i++) {
        total += tipArray[i];
    }
    return total / tipArray.length;
}
