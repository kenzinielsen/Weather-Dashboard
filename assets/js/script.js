var searchBtn = document.querySelector(".searchBtn");
var inputValue = document.querySelector(".inputValue");
var searchResult = document.querySelector(".searchResult");
var cityHistoryEl = document.querySelector("#city-buttons");
var pullHistory = document.querySelector("#city-history");
var items = [];

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
            
             var currentUvEl = document.querySelector(".currentUv")
             var color = document.createElement("p")
             color.classList.add("badge", "badge-danger")
             color.innerHTML = data.main.humidity
             currentUvEl.innerHTML="UV: ";
             currentUvEl.appendChild(color)
        

            //not sure if works
             localStorage.setItem("lastCitySaved", inputValue.value)
             console.log(lastItem)

             forecastSrch()
        })
    
    })
}
//var searchHistory = function () {``
//
//    // Save History
//    localStorage.setItem("value", JSON.stringify(items))
//
//    // Load History
//    cityHistoryEl.innerHTML = ""
//    for (i = 0; i < items.length; i++) {
//        var createHistory = document.createElement("button")
//        createHistory.setAttribute("class", "btn-secondary btn-lg btn-block city-history")
//        createHistory.innerHTML = ("value", items[i])
//        cityHistoryEl.append(createHistory)
//
//    }
//    };
function forecastSrch() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + inputValue.value+ "&units=imperial&appid=f7099a6b828983b5d3dfefa48057b726")
        .then(function (response) {
            return response.json()
        })
        .then(function (fiveDayData) {
            console.log(fiveDayData)

    var fiveDayCastArray = fiveDayData.list
     var forecastEl = document.querySelector(".forecast")
         forecastEl.innerHTML = ''
        for (let index = 7; index < fiveDayCastArray.length; index = index + 8) {

             console.log(fiveDayCastArray[index])

             forecastEl.innerHTML = forecastEl.innerHTML + `
             <div class="col-sm-2">

             <div class="card" style="width: 10rem;">

                 <div class="card-body">
                    <h5 class="card-title">${moment(fiveDayCastArray[index].dt, "X").format("MM/DD/YYYY")}</h5>
                    <img src=" http://openweathermap.org/img/wn/${fiveDayCastArray[index].weather[0].icon}.png">
                     <p class="card-text">Temp: ${fiveDayCastArray[index].main.temp}</p>
                     <p>Wind: ${fiveDayCastArray[index].wind.speed}</p>
                     <p>Humidity: ${fiveDayCastArray[index].main.humidity}</p>

                 </div>
             </div>
         </div>
             `

      }
})
}
 //})
//}//
function handleSearchHistory(event) {
    console.log(event.target)
    if (!event.target.matches(".city-history")) {
        return
    }
    var cityTarget = event.target.textContent
    console.log(cityTarget)
    getWeather(cityTarget)
}
cityHistoryEl.addEventListener("click", handleSearchHistory);


searchBtn.addEventListener("click", search);

//my api f7099a6b828983b5d3dfefa48057b726
