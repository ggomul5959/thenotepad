const units = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274
    },
    temperature: {
        celsius: '섭씨',
        fahrenheit: '화씨',
        kelvin: '켈빈'
    },
    engineering: {
        force: {
            newton: 1,
            kilonewton: 0.001,
            gramforce: 101.971621,
            kilogramforce: 0.101971621,
            poundforce: 0.224809
        },
        pressure: {
            pascal: 1,
            kilopascal: 0.001,
            bar: 0.00001,
            psi: 0.000145038,
            torr: 0.00750062
        }
    }
};

const unitNames = {
    length: {
        meter: '미터',
        kilometer: '킬로미터',
        centimeter: '센티미터',
        millimeter: '밀리미터',
        mile: '마일',
        yard: '야드',
        foot: '피트',
        inch: '인치'
    },
    weight: {
        kilogram: '킬로그램',
        gram: '그램',
        milligram: '밀리그램',
        pound: '파운드',
        ounce: '온스'
    },
    temperature: {
        celsius: '섭씨',
        fahrenheit: '화씨',
        kelvin: '켈빈'
    },
    engineering: {
        force: {
            newton: '뉴턴',
            kilonewton: '킬로뉴턴',
            gramforce: '그램힘',
            kilogramforce: '킬로그램힘',
            poundforce: '파운드힘'
        },
        pressure: {
            pascal: '파스칼',
            kilopascal: '킬로파스칼',
            bar: '바',
            psi: 'psi',
            torr: '토르'
        }
    }
};

function populateUnits() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    if (unitType === 'temperature') {
        Object.keys(units[unitType]).forEach(unit => {
            fromUnit.innerHTML += `<option value="${unit}">${unitNames[unitType][unit]}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unitNames[unitType][unit]}</option>`;
        });
    } else if (unitType === 'engineering') {
        const subUnits = units[unitType];
        Object.keys(subUnits).forEach(subUnitType => {
            Object.keys(subUnits[subUnitType]).forEach(unit => {
                const value = subUnits[subUnitType][unit];
                const unitName = `${subUnitType === 'force' ? '힘' : '압력'} - ${unitNames[unitType][subUnitType][unit]}`;
                fromUnit.innerHTML += `<option value="${value}">${unitName}</option>`;
                toUnit.innerHTML += `<option value="${value}">${unitName}</option>`;
            });
        });
    } else {
        Object.keys(units[unitType]).forEach(unit => {
            const unitName = unitNames[unitType][unit];
            fromUnit.innerHTML += `<option value="${units[unitType][unit]}">${unitName}</option>`;
            toUnit.innerHTML += `<option value="${units[unitType][unit]}">${unitName}</option>`;
        });
    }
}

function convert() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const fromValue = parseFloat(document.getElementById('fromValue').value);
    let toValue;

    if (unitType === 'temperature') {
        toValue = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        toValue = fromValue * (parseFloat(toUnit) / parseFloat(fromUnit));
    }

    document.getElementById('toValue').value = `${toValue.toFixed(2)} ${getUnitLabel(unitType, toUnit)}`;
}

function convertTemperature(value, from, to) {
    if (from === to) return value;

    if (from === 'celsius') {
        if (to === 'fahrenheit') return (value * 9/5) + 32;
        if (to === 'kelvin') return value + 273.15;
    }

    if (from === 'fahrenheit') {
        if (to === 'celsius') return (value - 32) * 5/9;
        if (to === 'kelvin') return ((value - 32) * 5/9) + 273.15;
    }

    if (from === 'kelvin') {
        if (to === 'celsius') return value - 273.15;
        if (to === 'fahrenheit') return ((value - 273.15) * 9/5) + 32;
    }
}

function getUnitLabel(unitType, unitValue) {
    if (unitType === 'temperature') {
        return unitNames[unitType][unitValue];
    }
    for (const [unit, value] of Object.entries(units[unitType])) {
        if (parseFloat(value) === parseFloat(unitValue)) {
            return unitNames[unitType][unit];
        }
    }
    return '';
}

document.addEventListener('DOMContentLoaded', populateUnits);
