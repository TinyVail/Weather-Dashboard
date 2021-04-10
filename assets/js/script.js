const key = "441ab10a773a3174b04e9e95a884b2bc";


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
                }).then((data) => {
                    console.log(data);
                    drawWeatherOfCity(data);
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
    for (let i=0; i<5; i++){
        const currentDate = new Date(weatherData.daily.dt * 1000);
        const currentTemp = weatherData.daily.temp;
        const currentHumidity = weatherData.daily.humidity;
        const currentWindspeed = weatherData.daily.windSpeed;
        const weatherIcon = weatherData.daily.weather.icon;
    }
    

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
