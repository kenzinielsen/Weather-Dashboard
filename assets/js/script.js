var searchBtn = document.querySelector(".searchBtn");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var currentTemp = document.querySelector(".currentTemp");
var currentWind = document.querySelector(".currentWind");
var currentHumidity = document.querySelector(".currentHumidity");
var currentUV = document.querySelector(".currentUV");

function search(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +inputValue.value+ '&appid=f7099a6b828983b5d3dfefa48057b726')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })

    //variable that will select where the info will be displayed
    var searchResult = document.querySelector(".searchResult");
};
searchBtn.addEventListener("click", search);