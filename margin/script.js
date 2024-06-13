document.getElementById('detailedMarginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const vat = parseFloat(document.getElementById('vat').value);
    const shippingCost = parseFloat(document.getElementById('shippingCost').value);
    const otherCosts = parseFloat(document.getElementById('otherCosts').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    
    if (isNaN(costPrice) || isNaN(vat) || isNaN(shippingCost) || isNaN(otherCosts) || isNaN(sellingPrice)) {
        alert('유효한 숫자를 입력해 주세요.');
        return;
    }

    const totalCost = costPrice + (costPrice * (vat / 100)) + shippingCost + otherCosts;
    const profit = sellingPrice - totalCost;
    const margin = (profit / sellingPrice) * 100;

    document.getElementById('result').innerHTML = `
        <table>
            <tr>
                <td>총 비용:</td>
                <td>${totalCost.toFixed(2)} 원</td>
            </tr>
            <tr>
                <td>마진율:</td>
                <td>${margin.toFixed(2)}%</td>
            </tr>
        </table>
    `;
});
