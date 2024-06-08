// script.js
function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    const interestType = document.querySelector('input[name="interest-type"]:checked').value;

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert('Please enter valid values for all fields.');
        return;
    }

    let interest, totalAmount;
    if (interestType === 'simple') {
        interest = principal * (rate / 100) * time;
        totalAmount = principal + interest;
    } else if (interestType === 'compound') {
        totalAmount = principal * Math.pow((1 + rate / 100), time);
        interest = totalAmount - principal;
    }

    document.getElementById('result').innerHTML = 
        `이자금: ${interest.toFixed(2)}<br>총액: ${totalAmount.toFixed(2)}`;
}
