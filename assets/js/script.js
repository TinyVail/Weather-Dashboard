const key = "441ab10a773a3174b04e9e95a884b2bc";


function getWeatherOfCity(nameCity) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${key}&units=imperial`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // code inside here update the DOM
            console.log(data);
            drawWeatherOfCity(data);
        });
}

function drawWeatherOfCity(weatherData) {
    const temperature = weatherData.main.temp;
    document.getElementById("weatherReturned").innerHTML = `<h1> The current temperature is: ${temperature}℉ </h1>`;
}

/*
async function getWeatherAsync(nameCity) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${key}&units=imperial`;
    const response = await fetch(url);
    return await response.json();
}
*/




getWeatherOfCity("Bismark");
console.log("Hello");
