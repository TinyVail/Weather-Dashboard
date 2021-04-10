const key = "441ab10a773a3174b04e9e95a884b2bc";

let visitedCities = [];



function getWeatherOfCity(nameCity) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${key}&units=imperial`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // code inside here update the DOM
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=${key}&units=imperial`;
            fetch(url)
                .then((response) => {
                    return response.json();
                }).then((weatherData) => {
                    weatherData.cityName = nameCity;
                    console.log(weatherData);
                    drawWeatherOfCity(weatherData);
                })
        });
}

function drawWeatherOfCity(weatherData) {
    const temperature = weatherData.current.temp;
    const humidity = weatherData.current.humidity;
    const windSpeed = weatherData.current.wind_speed;
    const UVindex = weatherData.current.uvi;
    document.getElementById("weatherReturned").innerHTML = `

      <ul class="list-group list-group-flush">
        <li class="list-group-item">The current temperature is: ${temperature}℉ </li>
        <li class="list-group-item">The current humidity is: ${humidity}%</li>
        <li class="list-group-item">The current UV index is: ${UVindex}/10 </li>
        <li class="list-group-item">The current windspeed is: ${windSpeed}MPH</li>
    </ul>
    `;

    //date weather conditions temperature and humidity
    for (let i = 0; i < 5; i++) {
        const currentDate = new Date(weatherData.daily[i].dt * 1000);
        const dateOptions = { month: "long", day: "numeric", weekday: "long" };

        const currentTemp = weatherData.daily[i].temp.day;
        const currentHumidity = weatherData.daily[i].humidity;
        const currentWindspeed = weatherData.daily[i].wind_speed;
        const weatherIcon = weatherData.daily[i].weather[0].icon;
        document.getElementById("weatherReturned").innerHTML += `
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        ${currentDate.toLocaleDateString("en", dateOptions)}
                        ${currentTemp} ℉
                        ${currentHumidity} %
                        ${currentWindspeed} MPH
                        <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png"></img>
                    </div>
                </div>
            </div>
        `;
    }

    addToVisitedCities(weatherData.cityName);
    document.getElementById("citySearchHistory").innerHTML = `<ul class="list-group list-group-flush">`;
    for (let i = 0; i < Math.min(8, visitedCities.length); i++) {
        document.getElementById("citySearchHistory").innerHTML += ` <li class="list-group-item"> ${visitedCities[i]}</li>`;
    }
    document.getElementById("citySearchHistory").innerHTML += `</ul>`;

}

function addToVisitedCities(cityName) {
    visitedCities = visitedCities.filter((visitedCity) => {
        return cityName != visitedCity;
    });
    visitedCities = [cityName, ...visitedCities];
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
