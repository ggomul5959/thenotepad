async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangeratesapi.io/latest');
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return {};
    }
}

async function fetchCurrencies() {
    const currencies = ['KRW', 'JPY', 'CNY', 'USD', 'EUR']; // 변환할 통화 목록

    const selectFrom = document.getElementById('fromCurrency');
    const selectTo = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.text = currency;
        option1.value = currency;
        const option2 = document.createElement('option');
        option2.text = currency;
        option2.value = currency;
        selectFrom.add(option1);
        selectTo.add(option2);
    });
}

async function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const exchangeRates = await fetchExchangeRates();

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    if (fromRate && toRate) {
        const exchangeRate = toRate / fromRate;
        const result = amount * exchangeRate;

        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } else {
        console.error('Invalid currency.');
    }
}

document.getElementById('convertButton').addEventListener('click', convert);

fetchCurrencies();
