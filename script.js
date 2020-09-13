//Variables
//Controls
const leftScroll = document.getElementById('leftScroll');
const rightScroll = document.getElementById('rightScroll');
let currentBackPic = document.getElementById('currentWeatherBackPic');
let currentWeatherIcon = document.getElementById('currentWeatherIcon');

//Buttons
const reset = document.getElementById('reset');
//make necessary changes here, changes made to html doc
let currentWeather = document.getElementById('currentWeather');
let weatherByMinute = document.getElementById('weatherByMinute');
let weatherByHour = document.getElementById('weatherByHour');
let dailyWeather = document.getElementById('dailyWeather');
let historicalWeather = document.getElementById('historicalWeather');


//App Data
let time = document.querySelectorAll('.otherTemp');
let dayofWeek = document.querySelectorAll('.dayofWeek');
let currentTemp = document.getElementById('currentTemp');
let tempLow = document.getElementById('tempLow');
let tempHigh = document.getElementById('tempHigh');
let weatherCondition =document.getElementById('weatherCondition');
let humudity = document.getElementById('humudity');

let currentDate = document.getElementById('currentDate');
let currentTime =document.getElementById('currentTime');
let currentLocation = document.getElementById('currentLocation');
let searchButton = document.getElementById('searchButton');


const date =  new Date();

//Try to get time and date using API
//Get Time and date
 const timeNow = () => {
    const time = new Date();
    let timeIn24h = time.getHours();
    let mode = 'AM';
    if(timeIn24h > 12){
        timeIn24h = timeIn24h - 12;
        mode = 'PM';
        }
    currentTime.innerHTML = `${timeIn24h} : ${time.getMinutes()} ${mode}`;
 }

 const dateNow = () =>{
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
//Add catch in case of error
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
//add catch in case of error

// console.log(dayofWeek);
//  console.log(time);

const getWeatherOtherDays = () =>{
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=d74fc369be79084d255892637839ecab&units=metric')
    .then((response) => response.json())
    .then(data => {

            for(let b = 0; b < time.length; b++){
                for(let a = 0; a < (data['daily'].length); a++){
                let z = data['daily'][a]['temp']['day'];
                 time[b].innerHTML = z;
                b++;
                // console.log(z);
                }

            }

            for(let j = 0; j < dayofWeek.length; j++){
                for(let i = 0; i < (data['daily'].length); i++){

                    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    let d = new Date(data['daily'][i]['dt'] * 1000);
                    let dayName = weekDays[d.getDay()];
                    dayofWeek[j].innerHTML = dayName;
                    j++;
                    console.log(dayofWeek[j]);
                }
            }
        } )
    }
getWeatherOtherDays();


//app features
//  store recent searches in local storage
               