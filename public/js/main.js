// openweather key = dd660038783e7f151a8686b5b793eec6
// zipcodeapi key = nzmTIoFtV61cBjl63uumfucHWi4NEjUfaBKfLisd5s98Tbj0sHv4PsweeX4LZxlQ
/*
doing multiple api calls. First, do an api call to zipcodeapi to get lat and lon from zipcode, 
https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>
then do an api call with that info to openweather to get onecall data
will do api call to https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

with call, I will have to store it and parse it to display data on the page
so input the zip code, on submit, that zip code gets stored and placed into the api call
have to convert temperature from kelvin to fahrenheit - find code on W3schools
*/

const clientOWKey = 'dd660038783e7f151a8686b5b793eec6'
let form = document.querySelector('.location-form')
;

// function getCoords(user_zip){
//     const request = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${user_zip}&appid=${clientOWKey}`)
//     const data = await request.json()
//     console.log(data)
//     let lat = data.lat
//     let lon = data.lon
//     console.log(lat, lon);
// };

// form.addEventListener('submit', async (event)=>{
//     event.preventDefault();
//     let lat = event.path[0][0].value;
//     let lon = event.path[0][1].value;
//     console.log(lat,lon)
//     const request2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly&appid=${clientOWKey}`);
//     let weatherData = request2.json()
//     console.log(weatherData)

// })



const getWeather = async (zipcode) => {
    
    const request = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${clientOWKey}`)
.then(response => response.json())    
.then(data => {
    console.log(data);
    let lat = data.lat;
    let lon = data.lon;
    console.log(data.name, lat, lon);
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly&appid=${clientOWKey}`)
})
.then(result => result.json())
.then(data2 => {
    let currentTemp = data2.current.temp;
    let currentFeel = data2.current.feels_like;
    let general = data2.current.weather[0].main;
    let weatherIcon = data2.current.weather[0].icon; // based on description of current weather(general)
        // then add that to url: http://openweathermap.org/img/wn/${weatherIcon}@2x.png to get icon matched to current weather
    let todayHigh = data2.daily[0].temp.max;
    let chanceOfRain = (data2.daily[0].pop)*100+"%"; //convert to a percentage
    let moon_phase = data2.daily[0].moon_phase;
    console.log(currentTemp, currentFeel, general, weatherIcon, todayHigh, chanceOfRain, moon_phase)
    
})
    
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(event)
    let zipcode = event.path[0][0].value
    console.log(zipcode)
    const request = await getWeather(zipcode);
    console.log(request)

    // let currentTemp = weatherData.current.temp;
    // let currentFeel = weatherData.current.feels_like;
    // let general = weatherData.current.weather[0].main;
    // let weatherIcon = weatherData.current.weather[0].icon; // based on description of current weather(general)
    //     // then add that to url: http://openweathermap.org/img/wn/${weatherIcon}@2x.png to get icon matched to current weather
    // let todayHigh = weatherData.daily[0].temp.max;
    // let chanceOfRain = weatherData.daily[0].pop; //convert to a percentage
    // let moon_phase = weatherData.daily.moon_phase;
    
});



    // let alert = weatherData.alerts[0].event;
    // let alertDescription = weatherData.alerts[0].description;
    // if(alert){let alert_icon = hazardous.svg};
    // let currentTemp = weatherData.current.temp;
    // let currentFeel = weatherData.current.feels_like;
    // let general = weatherData.current.weather[0].main;
    // let weatherIcon = weatherData.current.weather[0].icon; // based on description of current weather(general)
    //     then add that to url: http://openweathermap.org/img/wn/${weatherIcon}@2x.png to get icon matched to current weather
    // let todayHigh = weatherData.daily[0].temp.max;
    // let chanceOfRain = weatherData.daily[0].pop; //convert to a percentage
    // let moon_phase = weatherData.daily.moon_phase;
    //     if(_phase == 0) {let moon_icon = wi-moon-alt-new.svg; return 'new moon'} 
    //     if(moon_phase == 1) {let moon_icon = wi-moon-alt-new.svg; ;return 'new moon'}
    //     if (0<moon_phase<0.25) {let moon_icon = wi-moon-alt-waxing-crescent-3.svg;return 'waxing crescent'}
    //     if (moon_phase == 0.25) {let moon_icon = wi-moon-alt-first-quarter.svg;return 'first quarter moon'}
    //     if (0.25<moon_phase<0.5) {let moon_icon = wi-moon-alt-waxing-gibbous-3.svg;return 'waxing gibous'}
    //     if (moon_phase == 0.5) {let moon_icon = wi-moon-alt-full.svg;return 'full moon'}
    //     if (0.5<moon_phase<0.75) {let moon_icon = wi-moon-alt-waning-gibbous-4.svg;return 'waning gibous'}
    //     if (moon_phase == 0.75) {let moon_icon = wi-moon-alt-third-quarter.svg;return 'last quarter moon'}
    //     if (0.75<moon_phase<1) {let moon_icon = wi-moon-alt-waning-crescent-4.svg;return 'waning crescent'}