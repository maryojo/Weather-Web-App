//Variables
//Controls
const leftScroll = document.getElementById('leftScroll');
const rightScroll = document.getElementById('rightScroll');
let currentBackPic = document.getElementById('currentWeatherBackPic');
let currentWeatherIcon = document.getElementById('currentWeatherIcon');

//Buttons
const reset = document.getElementById('reset');
let currentWeather = document.getElementById('currentWeather');
let weatherByMinute = document.getElementById('weatherByMinute');
let weatherByHour = document.getElementById('weatherByHour');
let dailyWeather = document.getElementById('dailyWeather');
let historicalWeather = document.getElementById('historicalWeather');

//test
const here =document.getElementById('here');
const clatitude= document.getElementById('latitude');
const clongitude = document.getElementById('longitude');


//App Data
let time = document.querySelectorAll('.time');
let currentTemp = document.getElementById('currentTemp');
let tempLow = document.getElementById('tempLow');
let tempHigh = document.getElementById('tempHigh');
let weatherCondition =document.getElementById('weatherCondition');
let humudity = document.getElementById('humudity');

let currentDate = document.getElementById('currentDate');
let currentTime =document.getElementById('currentTime');
let currentLocation = document.getElementById('currentLocation');
let searchButton = document.getElementById('searchButton');

//Get Time and date
 const timeNow = () => {
    const time = new Date();
    let timeIn24h = time.getHours();
    if(timeIn24h > 12){
        timeIn24h = timeIn24h - 12;
        }
    currentTime.innerHTML = `${timeIn24h} : ${time.getMinutes()}`;
 }

 const dateNow = () =>{
     const date =  new Date();
     
     //Date
     todayDate = date.getDate();

     //Day of the week
     let weekDay = date.getDay();
     const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

     //Months
     let month = date.getMonth();
     const months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

     //Year
     let year = date.getFullYear();

     currentDate.innerHTML = `${weekDays[weekDay]}, ${months[month]} ${todayDate}, ${year}`;
 }

 let refreshTime = setInterval(timeNow, 0);
 let refreshDate = setInterval(dateNow, 0 );


//GET CURRENT LOCATION
//Functions
//Check if geolocation is supported
const checkGeolocator = () =>{
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPositionHere);
} else {
    alert('Geolocation is not supported. Try another browser');
    //Run a function which loads a default location
}
}

//Get current location, convert to city name and get weather details
const getPositionHere = (position) =>{
    let currentLatitude = position.coords.latitude;
    let currentLongitude = position.coords.longitude;
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ currentLatitude +'&lon=' + currentLongitude + '&appid=d74fc369be79084d255892637839ecab&units=metric')
.then(response => response.json())
.then(data => {
    console.log(data);
    let cityName = data['name'];
    let countryName = data['sys']['country'];
    let currentLocationWeather = data['main']['temp'];
    currentLocation.innerHTML = `${cityName}, ${countryName}`;
    currentTemp.innerHTML = `${currentLocationWeather}`;
})
}

//Calling Functions
checkGeolocator();

//SEARCHING FOR WEATHER OF A LOCATION

//GET WEATHER
//onload get weather of location

//on click of weathernow, show weather
//on search, get weather of location



//refresh weather every 30 minutes
//WEATHER FOR DIFFERENT DAYS
const getWeatherOtherDays = () =>{
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=d74fc369be79084d255892637839ecab&units=metric')
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        let dailyTemp = data ['hourly'][0]['clouds'];
        console.log(dailyTemp);
    })
}

getWeatherOtherDays();


//app features
//  store recent searches in local storage
//                          