const key = "441ab10a773a3174b04e9e95a884b2bc";

    
function getWeatherOfCity(nameCity){
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${key}&units=imperial`;
	fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
}


