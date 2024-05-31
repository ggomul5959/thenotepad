// script.js
document.addEventListener("DOMContentLoaded", () => {
    displayCurrentTime();
    populateTimezones();

    setInterval(displayCurrentTime, 1000); // Update current time every second
});

function displayCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('current-time').textContent = `Current Time: ${formattedTime}`;
}

function populateTimezones() {
    const select = document.querySelector('.custom-select .select-items');
    const timezones = moment.tz.names();

    timezones.forEach((timezone) => {
        const option = document.createElement('div');
        option.textContent = timezone;
        option.addEventListener('click', () => {
            document.querySelector('.search').value = timezone;
            select.style.display = 'none';
        });
        select.appendChild(option);
    });
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
    const timezone = document.querySelector('.search').value;
    if (!timezone) {
        alert('Please select a timezone.');
        return;
    }

    const now = moment();
    const targetTime = now.tz(timezone);

    const formattedTargetTime = targetTime.format('HH:mm:ss');
    document.getElementById('result').textContent = `Converted Time: ${formattedTargetTime}`;
}

