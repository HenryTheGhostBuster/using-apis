const gui = {
    data: document.querySelector('.dataWrapper'),
    inputField: document.querySelector('input')
};

let weatherData = {};

// Patikrinti skaičių ar šis yra sveikasis
function checkNumber(number) {
    return number === Math.floor(number) ? number : Number(number).toFixed(1);
}

// Atvaizduoti visus duomenis
function renderData() {
    gui.data.innerHTML = `
        <span class="data city">${weatherData.city_name}, ${weatherData.country_code}</span>
        <span class="data temp">${weatherData.temp}&deg;</span>
        <img class="icon" src="https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png">
        <span class="data other">Jausmas kaip: ${weatherData.app_temp}&deg;</span>
        <span class="data other">Drėgnumas: ${checkNumber(weatherData.rh)}&percnt;</span>
        <span class="data other">Debesuotumas: ${checkNumber(weatherData.clouds)}&percnt;</span>
        <span class="data other">Vėjo greitis: ${checkNumber(weatherData.wind_spd)}m/s</span>
        <span class="data other-space">Atnaujinta: ${weatherData.ob_time}</span>
    `;
}

// Pavaizduoti, kad vartotojo įvestis nėra teisinga
function wrongUserInput() {
    gui.inputField.style.padding = '18px';
    gui.inputField.style.border = '2px solid red';

    setTimeout(() => {
        gui.inputField.style.padding = '19px';
        gui.inputField.style.border = '1px solid rgba(34, 34, 34, 0.2)';
    }, 1000);
}

// Gauti dabartinius orų duomenis, pagal miestą, iš 'weatherbit.io'
function fetchData(location) {
    fetch(`https://api.weatherbit.io/v2.0/current?city=${location}&key=c2c6aefe27c649fda22c825c2cdc48ab`)
    .then((response) => {
        if (response.status === 200) {
            response.json().then((responseData) => {
                weatherData = responseData.data[0];
                renderData();
            });
        } else {
            wrongUserInput();
        }
    });
}

// Įvesties laukelio 'keypress event listener'
gui.inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && gui.inputField.value) {
        fetchData(gui.inputField.value);
        gui.inputField.value = '';
    } else if (e.key === 'Enter' && !gui.inputField.value) {
        wrongUserInput();
    }
});
