var searchBtn = document.querySelector(".searchBtn");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var currentTemp = document.querySelector(".currentTemp");
var currentWind = document.querySelector(".currentWind");
var currentHumidity = document.querySelector(".currentHumidity");
var currentUV = document.querySelector(".currentUV");
var searchResult = document.querySelector(".searchResult");

let lastItem = localStorage.getItem("lastCitySaved")

function search(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +inputValue.value+ '&units=imperial&appid=f7099a6b828983b5d3dfefa48057b726')
    .then(function(response) {
        response.json().then(function(data)  {
             var cityResultEl = document.querySelector(".cityResult");
             cityResultEl.innerHTML = data.name + "(" + moment(data.dt, "X").format("MM/DD/YYYY") + ") <img src=' http://openweathermap.org/img/wn/" + data.weather[0].icon +".png' >"
        
             var currentTempEl = document.querySelector(".currentTemp");
             $(currentTempEl).empty().append("Temperature: " + data.main.temp + "°F");

             var currentWindEl = document.querySelector(".currentWind");
             $(currentWindEl).empty().append("Wind: " + data.wind.speed);

             var currentHumidityEl = document.querySelector(".currentHumidity");
             $(currentHumidityEl).empty().append("Humidity: " + data.main.humidity);
        
            // var currentUvEl = document.querySelector(".currentUv");
            // $(currentUvEL).empty().append("UV Index: " + current.uvi);

            //not sure if works
             localStorage.setItem("lastCitySaved", inputValue.value)
             console.log(lastItem)
        })
    })
};

//5 day forecast
function future() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" +lastCitySaved + "&appid=f7099a6b828983b5d3dfefa48057b726")

    .then(function(response) {
        return response.json();
      })
      .then(function(response) {
    console.log(data)
    })
}

searchBtn.addEventListener("click", search)

//my api f7099a6b828983b5d3dfefa48057b726
