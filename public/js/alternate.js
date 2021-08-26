const clientOWKey = 'dd660038783e7f151a8686b5b793eec6'
let form = document.querySelector('.location-form');
var now = Number(String(new Date().getTime()).slice(0,10))
console.log(now)

function capitalize(s)
{   
    return s[0].toUpperCase() + s.slice(1);
}

let moon_images = {
    "New Moon": "new.png",
    "Waning Crescent": "waning-crescent.png",
    "First Quarter Moon": "first-quarter.png",
    "Waning Gibbous": "waning-gibbous.png",
    "Full Moon Tonight": "full.png",
    "Waxing Gibbous": "waxing-gibbous.png",
    "Third Quarter Moon": "third-quarter.png",
    "Waxing Crescent": "waxing-crescent.png",
};

let backgrounds = {
    "Clear": ["clear-sky-day.jpg", "clear-sky-night.jpg"],
    "cloudy": ["cloudy.jpg", "cloudy-night.jpg"],
    "few clouds": ["partly-cloudy.jpg", "partly-cloudy-night.jpg"],
    "Snow": "cold-winter-snow.jpg",
    "Rain": ["rainy-day.jpg", "rainy-night.jpg"],
    "Thunderstorm": "thunderstorm.jpg",
    "Smoke": "smoky.jpg",
    "Hazy":"hazy.jpg",
};

let image_url = document.querySelector('style')
console.log(image_url.innerHTML);

const getCoords = async (user_zip) => {
    /**
     * @param user_zip is user-provided zip code
     * 
     * Function sends user-supplied zip code to api
     * and returns location info such as latitude and
     * longitude to be used in next function. 
     */
    const request = await fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${user_zip}&appid=${clientOWKey}`)
    let response = await request.json()
    console.log(response)
    return response
};  
    

const getWeather = async(lat ,lon) => {
    /**
     * @param lat - latitude of a location
     * @param lon - longitude of a location
     * 
     * Function sends lat and lon to api
     * and returns local weather data
     */
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly&appid=${clientOWKey}`)
    let weatherData = weather.json()
    console.log(weatherData)
    return weatherData
};

const main = (sunrise, sunset, now, general, currentWeather, city) => {
    let background_image = "default-background.jpg"
    if (general === "Clear" && now > sunrise && now < sunset){
        background_image = `${backgrounds["Clear"][0]}`
    } else if((general === "Clear" && now > sunset) || (general == "Clear" && now < sunrise)){
        background_image = `${backgrounds["Clear"][1]}`
    } else if((currentWeather === "few clouds" || currentWeather === "scattered clouds") && (now > sunrise && now < sunset)){
        background_image = `${backgrounds["few clouds"][0]}`
    } else if((currentWeather === "few clouds" || currentWeather === "scattered clouds") && (now > sunset || now < sunrise)) {
            background_image = `${backgrounds["few clouds"][1]}`
    } else if (currentWeather === "broken clouds" || currentWeather === "overcast clouds" && (now > sunrise && now < sunset)) {
        background_image = `${backgrounds["cloudy"][0]}`
    } else if (currentWeather === "broken clouds" || currentWeather === "overcast clouds" && (now > sunset || now < sunrise)) {
        background_image = `${backgrounds["cloudy"][1]}`
    } else if(general === "Rain" && (now > sunrise && now < sunset)){
        background_image = `${backgrounds["Rain"][0]}`
    } else if(general === "Rain" && (now > sunset || now < sunrise)) {
        background_image = `${backgrounds["Rain"][1]}`
    } else if(general === "Snow"){
        background_image = `${backgrounds["Snow"]}`
    } else if(general === "Thunderstorm"){
        background_image = `${backgrounds["Thunderstorm"]}`
    } else if (general === "Hazy" || general === "Mist"){
        background_image = `${backgrounds["Hazy"]}`
    } else if (general === "Smoke"){
        background_image = `${backgrounds["Smoke"]}`
    }
    console.log(currentWeather, general)
    let general_display = 
    `<div class="row fadeIn col-md-8 mx-auto text-center my-3 pt-2 border-top border-bottom border-secondary">
        <h2>Currently in ${city}</h2>
    </div>
    <div class="row py-0.5 fadeIn">
        <div class="col-md-6 offset-3">
            <h4 id="overall-condition">${capitalize(currentWeather)}</h4>
        </div>
    </div>`;
    document.querySelector('.weather-data').insertAdjacentHTML('afterbegin', general_display);
    document.querySelector('style').innerHTML = 
    `body {
        transition: background-image 2s ease-in-out;
        background-image: url('/assets/background-images/${background_image}');
        background-repeat: no-repeat;
        background-size: cover;
    }`
};

const temps = (currentTemp, currentFeel, todayHigh) =>{
    let temperature_info = 
        `<div class="row py-0.5 fadeIn">
        <div class="col-md-8 offset-3">
            <h4>Currently: ${Math.round(currentTemp)}º</h4>
            <h4>Feels like: ${Math.round(currentFeel)}º </h4>
        </div>
        </div>
        
        <div class="row py-0.5 fadeIn">
        <div class="col-md-8 offset-3">
            <h4>Today's high: ${Math.round(todayHigh)}º</h4>
        </div>
        </div>`;
    document.querySelector('.weather-data').insertAdjacentHTML('beforeend', temperature_info);
};

const precip = (chanceOfRain) =>{
    let precip_info = 
        `<div class="row py-0.5 fadeIn">
        <div class="col-md-6 offset-3">
        <h4>${chanceOfRain} chance of rain</h4>
        </div>
        </div>`;
    document.querySelector('.weather-data').insertAdjacentHTML('beforeend', precip_info);
};

const luna = (moon_phase) =>{
    let moon_message = `It's up there somewhere.`
    if(moon_phase === 0 || moon_phase === 1) {
        moon_message = 'New Moon'
    } else if(moon_phase > 0 && moon_phase < 0.25){
        moon_message = 'Waxing Crescent'
    } else if(moon_phase === 0.25){
        moon_message = 'First Quarter Moon'
    } else if (moon_phase > 0.25 && moon_phase < 0.5){
        moon_message = 'Waxing Gibbous'
    } else if (moon_phase === 0.5){
        moon_message = 'Full Moon Tonight'
    } else if (moon_phase > 0.5 && moon_phase < 0.75){
        moon_message = 'Waning Gibbous'
    } else if (moon_phase === 0.75){
        moon_message = 'Third Quarter Moon'
    } else if (moon_phase > 0.75 && moon_phase < 1){
        moon_message = 'Waning Crescent'
    }
        console.log(moon_message)
    let moon_display = 
        `<div class="row py-0.5 fadeIn" id="moon_div">
            <div class="col-md-4 offset-3">
                <h4>Tonight's moon:<br> ${moon_message}</h4>
            </div>
            <div class="d-flex col-md-1 align-middle">
                <img src="/assets/moon_icons/${moon_images[moon_message]}" class="moon_icon">
            </div>
            <div class="col-md-4"></div>
        </div>`;
    document.querySelector('.weather-data').insertAdjacentHTML('beforeend', moon_display);
};

const clearData = () =>{
    document.querySelector('.weather-data').innerHTML = ""
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearData();
    console.log(event)
        let user_zip = event.path[0][0].value
        console.log(user_zip)
    let location = await getCoords(user_zip);
        let lat = location.lat
        let lon = location.lon
        let city = location.name
        console.log(lat, lon)
    let weather = await getWeather(lat, lon)
        console.log(weather)
        let general = weather.current.weather[0].main;
        // series of if statements that reset image url in html: style, body, background-image url
        let sunrise = weather.current.sunrise;
        let sunset = weather.current.sunset;
        let currentTemp = weather.current.temp;
        let currentFeel = weather.current.feels_like;
        let currentWeather = weather.current.weather[0].description; // based on description of current weather(general)
        let todayHigh = weather.daily[0].temp.max;
        let chanceOfRain = (weather.daily[0].pop)*100+"%"; //convert to a percentage
        let moon_phase = weather.daily[0].moon_phase;
        console.log(weather.daily[0].moon_phase)
        // const weather_data = 
        // `<div class="container" id="weather-data">
        
        // </div>`
        // document.querySelector('#the-one').insertAdjacentHTML('beforeend', weather_data)
        main (sunrise, sunset, now, general, currentWeather, city);
        temps (currentTemp, currentFeel, todayHigh);
        precip (chanceOfRain);
        luna (moon_phase);
});

