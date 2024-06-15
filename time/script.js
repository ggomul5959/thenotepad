document.addEventListener("DOMContentLoaded", () => {
    displayCurrentTime();
    populateTimezones();

    setInterval(displayCurrentTime, 1000); // Update current time every second
});

function displayCurrentTime() {
    const now = new Date();
    const localTime = now.toLocaleTimeString('en-US', { hour12: false });
    const gmtTime = now.toUTCString().slice(-12, -4); // Extracting just the time part

    document.getElementById('current-time').innerHTML = `현재 시간: ${localTime} (Local) <br> GMT 시간: ${gmtTime}`;
}

function populateTimezones() {
    const select = document.querySelector('.custom-select .select-items');
    const timezones = moment.tz.names();

    timezones.forEach((timezone) => {
        const translatedTimezone = translateTimezone(timezone);
        if (translatedTimezone) {
            const option = document.createElement('div');
            option.textContent = translatedTimezone;
            option.setAttribute('data-timezone', timezone); // 원래의 타임존 이름을 저장
            option.addEventListener('click', () => {
                document.querySelector('.search').value = translatedTimezone;
                select.style.display = 'none';
            });
            select.appendChild(option);
        }
    });
}

function translateTimezone(timezone) {
    const translations = {
        // 아시아
        "Asia/Seoul": "아시아/대한민국/서울",
        "Asia/Tokyo": "아시아/일본/도쿄",
        "Asia/Shanghai": "아시아/중국/상하이",
        "Asia/Hong_Kong": "아시아/홍콩/홍콩",
        "Asia/Bangkok": "아시아/태국/방콕",
        "Asia/Singapore": "아시아/싱가포르/싱가포르",
        "Asia/Jakarta": "아시아/인도네시아/자카르타",
        "Asia/Kuala_Lumpur": "아시아/말레이시아/쿠알라룸푸르",
        "Asia/Manila": "아시아/필리핀/마닐라",
        "Asia/Kolkata": "아시아/인도/콜카타",
        "Asia/Dubai": "아시아/아랍에미리트/두바이",
        "Asia/Riyadh": "아시아/사우디아라비아/리야드",

        // 유럽
        "Europe/London": "유럽/영국/런던",
        "Europe/Paris": "유럽/프랑스/파리",
        "Europe/Berlin": "유럽/독일/베를린",
        "Europe/Moscow": "유럽/러시아/모스크바",
        "Europe/Madrid": "유럽/스페인/마드리드",
        "Europe/Rome": "유럽/이탈리아/로마",
        "Europe/Istanbul": "유럽/터키/이스탄불",
        "Europe/Amsterdam": "유럽/네덜란드/암스테르담",
        "Europe/Zurich": "유럽/스위스/취리히",
        "Europe/Stockholm": "유럽/스웨덴/스톡홀름",
        "Europe/Vienna": "유럽/오스트리아/빈",
        "Europe/Oslo": "유럽/노르웨이/오슬로",
        "Europe/Brussels": "유럽/벨기에/브뤼셀",
        "Europe/Athens": "유럽/그리스/아테네",
        "Europe/Warsaw": "유럽/폴란드/바르샤바",
        "Europe/Budapest": "유럽/헝가리/부다페스트",

        // 북아메리카
        "America/New_York": "북아메리카/미국/뉴욕",
        "America/Los_Angeles": "북아메리카/미국/로스앤젤레스",
        "America/Chicago": "북아메리카/미국/시카고",
        "America/Toronto": "북아메리카/캐나다/토론토",
        "America/Vancouver": "북아메리카/캐나다/밴쿠버",
        "America/Mexico_City": "북아메리카/멕시코/멕시코시티",
        "America/Montreal": "북아메리카/캐나다/몬트리올",
        "America/Phoenix": "북아메리카/미국/피닉스",
        "America/Denver": "북아메리카/미국/덴버",
        "America/Anchorage": "북아메리카/미국/앵커리지",

        // 남아메리카
        "America/Sao_Paulo": "남아메리카/브라질/상파울루",
        "America/Buenos_Aires": "남아메리카/아르헨티나/부에노스아이레스",
        "America/Lima": "남아메리카/페루/리마",
        "America/Bogota": "남아메리카/콜롬비아/보고타",
        "America/Santiago": "남아메리카/칠레/산티아고",
        "America/Caracas": "남아메리카/베네수엘라/카라카스",
        "America/Montevideo": "남아메리카/우루과이/몬테비데오",
        "America/Asuncion": "남아메리카/파라과이/아순시온",
        "America/La_Paz": "남아메리카/볼리비아/라파스",

        // 아프리카
        "Africa/Johannesburg": "아프리카/남아프리카공화국/요하네스버그",
        "Africa/Cairo": "아프리카/이집트/카이로",
        "Africa/Lagos": "아프리카/나이지리아/라고스",
        "Africa/Nairobi": "아프리카/케냐/나이로비",
        "Africa/Algiers": "아프리카/알제리/알제",
        "Africa/Casablanca": "아프리카/모로코/카사블랑카",
        "Africa/Accra": "아프리카/가나/아크라",
        "Africa/Addis_Ababa": "아프리카/에티오피아/아디스아바바",
        "Africa/Dakar": "아프리카/세네갈/다카르",

        // 오세아니아
        "Australia/Sydney": "오세아니아/호주/시드니",
        "Australia/Melbourne": "오세아니아/호주/멜버른",
        "Australia/Brisbane": "오세아니아/호주/브리즈번",
        "Pacific/Auckland": "오세아니아/뉴질랜드/오클랜드",
        "Pacific/Fiji": "오세아니아/피지/피지",
        "Australia/Perth": "오세아니아/호주/퍼스",
        "Australia/Adelaide": "오세아니아/호주/애들레이드",
        "Pacific/Port_Moresby": "오세아니아/파푸아뉴기니/포트모르즈비"
    };

    return translations[timezone] || null;
}

function filterTimezones() {
    const input = document.querySelector('.search').value.toLowerCase();
    const select = document.querySelector('.custom-select .select-items');

    select.style.display = 'block';
    const options = select.querySelectorAll('div');

    options.forEach(option => {
        const timezone = option.textContent.toLowerCase();
        if (timezone.includes(input)) {
            option.style.display = 'block'; // Show matching options
        } else {
            option.style.display = 'none'; // Hide non-matching options
        }
    });
}

function convertTime() {
    const koreanTimezone = document.querySelector('.search').value;
    if (!koreanTimezone) {
        alert('타임존을 선택하세요.');
        return;
    }

    const option = Array.from(document.querySelectorAll('.select-items div'))
        .find(div => div.textContent === koreanTimezone);
    
    const timezone = option ? option.getAttribute('data-timezone') : null;
    if (!timezone) {
        alert('유효하지 않은 타임존입니다.');
        return;
    }

    const now = moment();
    const targetTime = now.tz(timezone);

    const formattedTargetTime = targetTime.format('HH:mm:ss');
    document.getElementById('result').textContent = `변환된 시간: ${formattedTargetTime}`;
}
