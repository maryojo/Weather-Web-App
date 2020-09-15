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
let searchInput = document.getElementById('search');

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//GET CURRENT LOCATION
//Functions
//Check if geolocation is supported
const checkGeolocator = () =>{
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPositionHere);
    // navigator.geolocation.getCurrentPosition(getWeatherOtherDays);
} else {
    alert('Geolocation is not supported. Try another browser');
    //Run a function which loads a default location
}
}

let u, call, encodeCall, cityName, countryName, currentLocationWeather, plat, plon, d, dayName, placeName;

//Get current location, convert to city name and get weather details
//Add catch in case of error
// searchButton.addEventListener('click', function(){
//     placeName = `q=${searchInput.value}`;
//     getCityDate(placeName);
// });
searchButton.addEventListener('click', function(){
    placeName = `q=${searchInput.value}`;
    getCityDate(placeName);
    if(u!==0){
        clearInterval(u);
    }
});

const getPositionHere = (position) =>{
    //identify users longitude & latitude
     window.currentLatitude = position.coords.latitude;
     window.currentLongitude = position.coords.longitude;
     call = `lat=${window.currentLatitude}&lon=${window.currentLongitude}`;

     getCityDate(call);
}

const getCityDate = (g) =>{
     console.log(g);
    fetch('https://api.openweathermap.org/data/2.5/weather?'+g+'&appid=d74fc369be79084d255892637839ecab&units=metric')
.then(response => response.json())
.then(data => {
    console.log(data);

    
    //Convert latitude & longitude to Location Name
    cityName = data['name'];
    countryName = data['sys']['country'];
    currentLocationWeather = data['main']['temp'];
    let latitude = data['coord']['lat'];
    let longitude = data['coord']['lon'];
    currentLocation.innerHTML = `${cityName}, ${countryName}`;
    currentTemp.innerHTML = `${currentLocationWeather}`;
    

    return fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=d74fc369be79084d255892637839ecab&units=metric');
}) .then(response => response.json())
.then(data => {
    console.log(data);
    for(let b = 0; b < time.length; b++){
        for(let a = 0; a < (data['daily'].length); a++){
        // console.log(data['daily'].length);
        z = data['daily'][a]['temp']['day'];
         time[b].innerHTML = z;
        b++;
        } 
    }

    //looping through the name of each day 
    for(let j = 0; j < dayofWeek.length; j++){
        for(let i = 0; i < (data['daily'].length); i++){

            d = new Date(data['daily'][i]['dt'] * 1000);
            dayName = weekDays[d.getDay()];
            dayofWeek[j].innerHTML = dayName;
            // console.log(dayofWeek[j]);
            j++;
            
        }
    }

    let timezone = data['timezone'];
            let values = {
                timeZone: timezone,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
            }
        
        // let u;
        const getTime = () =>{
            // clearTimeout(loadTimewithClick);
            let d = new Intl.DateTimeFormat([], values);
            currentTime.innerHTML = `${d.format(new Date())}`;
        }

        //on a normal load, setinterval is this
        u = 0;
        u = setInterval(() => {
            getTime();
        }, 10);

        //on click, pass this parameter, clearInterval and set new IntervAL
        
        //
        

        // let ref = setInterval(() => {
        //     getTime();
        // }, 10);

        // if(u === 0){
        //     clearInterval(ref);
        // }
        // clearInterval(refreshTime);
})

}

//Calling Functions
//check if geolocatoris supported
checkGeolocator();

//SEARCHING FOR WEATHER OF A LOCATION

//GET WEATHER
//onload get weather of location

//on click of weathernow, show weather
//on search, get weather of location

//WEATHER FOR DIFFERENT DAYS
//add catch in case of error

// const h= `q=${searchInput.value}`


//app features
//  store recent searches in local storage
    