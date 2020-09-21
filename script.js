//Variables
//Controls
const leftScroll = document.getElementById('leftScroll');
const rightScroll = document.getElementById('rightScroll');
let currentBackPic = document.getElementById('currentWeatherBackPic');
let currentWeatherIcon = document.getElementById('currentWeatherIcon');
let searchButton = document.getElementById('searchButton');
let searchInput = document.getElementById('search');

//Buttons
const reset = document.getElementById('reset');
const refreshWeather = document.getElementById('refreshWeatherData');
const history = document.getElementById('history');
const save = document.getElementById('save');

//App Data
let otherDaysTemp = document.querySelectorAll('.otherTemp');
let dayofWeek = document.querySelectorAll('.dayofWeek');
let dayIcon =document.querySelectorAll('.dayIcon');
let currentTemp = document.getElementById('currentTemp');
let tempLow = document.getElementById('tempLow');
let tempHigh = document.getElementById('tempHigh');
let weatherCondition =document.getElementById('weatherCondition');

//other weather states 
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let windspeed = document.getElementById('windspeed');
let winddirection = document.getElementById('winddirection');
let cloudiness = document.getElementById('cloudiness');


let currentDate = document.getElementById('currentDate');
let currentTime =document.getElementById('currentTime');
let currentLocation = document.getElementById('currentLocation');


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


let u, apiCoordCall, dayName, cityNameInput;

let cityName, countryName, currentLocationWeather, minTemp, maxTemp;

let getHumidity, getPressure, getWindSpeed, getWindDirection, getCloudiness;

//Get current location, convert to city name and get weather details
//Add catch in case of error


//On click of search button, get city name from input and run function

const searchButtonFunction = () =>{
    console.log(1)
    cityNameInput = `q=${searchInput.value}`;
    getCityDate(cityNameInput);

    //Clear setInterval of getTime, when new input is filled
    if(u!==0){
        clearInterval(u);
    }
}
    
searchButton.addEventListener('click', searchButtonFunction);

const getPositionHere = (position) =>{

    //identify users longitude & latitude
     window.currentLatitude = position.coords.latitude;
     window.currentLongitude = position.coords.longitude;
     apiCoordCall = `lat=${window.currentLatitude}&lon=${window.currentLongitude}`;

     getCityDate(apiCoordCall);
}

const getCityDate = (g) =>{
     console.log(g);
    fetch('https://api.openweathermap.org/data/2.5/weather?'+g+'&appid=d74fc369be79084d255892637839ecab&units=metric')
.then(response => response.json())
.then(data => {
    console.log(data);
    
    localStorage.setItem('data', checkS(data));

    function checkS(s){
        if (typeof data != "string"){
            s = JSON.stringify(s);
        } return s;
    }

    //Convert latitude & longitude to Location Name
    cityName = data['name'];
    // currentLocation.innerHTML = `${cityName}`;
    countryName = data['sys']['country'];
    weatherIcon = data['weather'][0]['icon'];
    currentLocationWeather = data['main']['temp'];
    minTemp = data['main']['temp_min'];
    maxTemp = data['main']['temp_max'];
    weatherDescription = data['weather'][0]['description'];

    

    //Other weather states
    getHumidity = data['main']['humidity'];
    getPressure = data['main']['pressure'];
    getWindSpeed = data['wind']['speed'];
    getWindDirection = data['wind']['deg'];
    getCloudiness = data['clouds']['all'] ;

    //Get coordinates as calls for second API (important if search is used)

    let latitude = data['coord']['lat'];
    let longitude = data['coord']['lon'];

    //Showing the data gotten in UI
    currentLocation.innerHTML = `${cityName}, ${countryName}`;

    

    currentWeatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">`;

    currentTemp.innerHTML = `${currentLocationWeather}`;
    weatherCondition.innerHTML = `${weatherDescription}`;
    tempLow.innerHTML = `${minTemp}`;
    tempHigh.innerHTML = `${maxTemp}`;

    //Other weather states into UI
    humidity.innerHTML = `${getHumidity}`;
    pressure.innerHTML = `${getPressure}`;
    windspeed.innerHTML = `${getWindSpeed}`;
    winddirection.innerHTML = `${getWindDirection}`;
    cloudiness.innerHTML = `${getCloudiness}`;

    // }

    // gt();
    

    return fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=d74fc369be79084d255892637839ecab&units=metric');
}) .then(response => response.json())
.then(data => {
    console.log(data);

//Changing the back pic based on time of the day
    let sunrise = data['current']['sunrise'];
    let sunset = data['current']['sunset'];
    let dt = data['current']['dt'];
    let average = (sunrise + sunset)/3;
    let morning = sunrise + average ;
    let afternoon = morning + average;
    let evening = afternoon + average;

    if(dt >= sunrise && dt < morning){
        currentBackPic.innerHTML = `<img src="images/Sunset.png" class="currentWeatherBackPic">`;
    } else if(dt >= morning && dt < afternoon){
        currentBackPic.innerHTML = `<img src="images/Afternoon.png" class="currentWeatherBackPic">`;
    } else if(dt >= afternoon && dt < evening){
        currentBackPic.innerHTML = `<img src="images/Evening.png" class="currentWeatherBackPic">`;
    }else {
        currentBackPic.innerHTML = `<img src="images/Night.png" class="currentWeatherBackPic">`;
    }


//Loop to change other Days Temperature and weather deacription
    for(let b = 0; b < otherDaysTemp.length; b++){
        for(let a = 0; a < (data['daily'].length); a++){
            //check variable below
        dailyTempData = data['daily'][a]['temp']['day'];
         otherDaysTemp[b].innerHTML = dailyTempData;
        b++;
        } 
    }

    //looping through the name of each day 
    for(let j = 0; j < dayofWeek.length; j++){
        for(let i = 0; i < (data['daily'].length); i++){

            let dt = new Date(data['daily'][i]['dt'] * 1000);
            dayName = weekDays[dt.getDay()];
            dayofWeek[j].innerHTML = dayName;
            j++;
        }
    }

    // dayofWeek = [dayName[0], dayName[1], dayName]

    //looping through for the icon of each day
    //icon changed to description
    //changes not applied to html class, dayIcon
    for(let y = 0; y < dayIcon.length; y++){
        for(let z = 0; z < (data['daily'].length); z++){

            let desc = data['daily'][z]['weather'][0]['description'];
            dayIcon[y].innerHTML = `<p class="weatherCondition smaller-font">${desc}</p>`;
            y++;
        }
    }


//Get time and date from timezone
    let timezone = data['timezone'];
            let timeValues = {
                timeZone: timezone,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
            }
        
        const getTime = () =>{
            let d = new Intl.DateTimeFormat([], timeValues);
            currentTime.innerHTML = `${d.format(new Date())}`;
        }

        //on default load, setinterval is this
        u = 0;
        u = setInterval(() => {
            getTime();
        }, 10);
    
})
.catch(() =>{

            console.log(1);
        // const getSavedData = (k) =>{
            function getS(k){
                if(localStorage.getItem(k) === null){
                    alert("Sorry");
                } else {
                    return JSON.parse(localStorage.getItem(k));
                }
            
            }
            
        
            let myData = getS('data');
        
            data = myData;
        
            currentLocation.innerHTML = data['name'];
            
            console.log(data);
        
    
            // const d = () => {
            //     console.log(3);
            

})

}

//Calling Functions
//check if geolocator is supported
checkGeolocator();


//WEATHER FOR DIFFERENT DAYS
//add catch in case of error

//Control buttons
reset.addEventListener('click', function(){
    if(u!==0){
        clearInterval(u);
        checkGeolocator();
    }
    
});

refreshWeather.addEventListener('click', function(){
    if(searchInput.value === ""){
        getCityDate(`lat=${window.currentLatitude}&lon=${window.currentLongitude}`);
    } else {
       searchButtonFunction();
    }
});

// save.addEventListener("click", function(){
//     if(localStorage.getItem('data') === null){
//         alert("Sorry");
//     } else {
//         let myData = JSON.parse(localStorage.getItem('data'));
//         localStorage.setItem('saved-search:', JSON.stringify(myData));

//     }
// });

//app features
//  store recent searches in local storage

