async function fetchExchangeRates() {
    const API_KEY = 'lKtQiWfhqrvEn6LD3CL5p7d3fDKb0KOV'; // 여기에 발급받은 API 키를 넣어주세요

    try {
        const response = await fetch(`https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=AUTHKEYlKtQiWfhqrvEn6LD3CL5p7d3fDKb0KOV&searchdate=20180102&data=AP01`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return {};
    }
}

async function fetchCurrencies() {
    const exchangeRates = await fetchExchangeRates();
    const currencies = exchangeRates.map(rate => rate.cur_unit); // 환율 정보에서 통화 코드 추출

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
    const fromRate = exchangeRates.find(rate => rate.cur_unit === fromCurrency).deal_bas_r;
    const toRate = exchangeRates.find(rate => rate.cur_unit === toCurrency).deal_bas_r;

    const exchangeRate = toRate / fromRate;
    const result = amount * exchangeRate;

    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

document.getElementById('convertButton').addEventListener('click', convert);

fetchCurrencies();
