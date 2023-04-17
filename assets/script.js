var sample 

const APIKey = "b8fd273274a528d392087bd0cf821d1e";

var searchButton = $('#searchButton');

var cityInputField = $('#search-input');

var recentCityButton = $("#recent-cities");

var cityChoiceArray = []

var currForecastCard = $('#dailyForecast');

var FutureForecastCard = $('#futureContainer');

var currentDay = dayjs();

const futureForecastArray = []

var currDayFormat = currentDay.format('M D, YYYY');

console.log(currDayFormat);

var cityNameLocalStorageArray = []

var recentCityDiv = $('#recentContainer');

function setLocalStorage(){
  localStorage.setItem('recentCities', JSON.stringify(cityNameLocalStorageArray));
    console.log(localStorage);
}


function getLocalStorage(){
  cityButtonText = JSON.parse(localStorage.getItem('recentCities'))
  
  
}
// getLocalStorage()

searchButton.click( function(event){
  event.preventDefault();
  console.log(event.target);
  var cityTypefield = cityInputField.val();
  
  cityChoiceArray.splice(0, 1, cityTypefield);
  console.log(cityChoiceArray)  
  FutureForecastCard.innerHTML = '';
  currForecastCard.innerHTML = '';
  makeAPICall()

})

recentCityButton.click( function(e){
  e.preventDefault()
  console.log(e.target);
  var recentCity = recentCityButton.text();
  
  cityChoiceArray.splice(0, 1, recentCity);
  console.log(cityChoiceArray)
  FutureForecastCard.outerHTML = '';
  currForecastCard.outerHTML = '';
  makeAPICall()


})


function makeAPICall(){
  
  
  if(cityChoiceArray == null ){
    alert("You must select a city");
    location.reload()
  }
  // var recentCity  = recentCityButton.textContent;
  // cityChoiceArray.splice(0, 1, recentCity);
  // console.log(cityChoiceArray)

  // var cityInputField = document.getElementById('#search-input');

  var cityName = cityChoiceArray[0];

  cityNameLocalStorageArray.push(cityName);

  // getting city name and entering it into api call url
  var weatherFetchURLnumOne = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
  //fetch function number 1 to get the 5 day forecast 
  fetch(weatherFetchURLnumOne)
    .then(function (response) {
      
      return response.json();
    })
    // taking the json response and converting it into an array of objects 
    .then( function (data) {
      console.log(data);
      
      getNumberOfDays(data)
    function getNumberOfDays(){  // gary gave us this for loop to use 
    for( let i=0; i<40; i=i+8 ){

      const daysInForecast = data.list 
      
      futureForecastArray.push(daysInForecast[i])

      
    }
    console.log(futureForecastArray)
    
  }
  populateFutureForecast(futureForecastArray)
})
// for loop to populate the five day forecast
function populateFutureForecast(futureForecastArray){ 

    for(var i =0; i<futureForecastArray.length; i++){
      var FutureForecastIcon = futureForecastArray[i].weather[0].icon;
      var weatherIcon = `https://openweathermap.org/img/wn/${FutureForecastIcon}@2x.png`
      console.log(weatherIcon);
      var FutureForecastWind = futureForecastArray[i].wind.speed;
      var FutureForecastTemp = futureForecastArray[i].main.temp;
      var FutureForecastHumid = futureForecastArray[i].main.humidity;
      var FutureForecastDataEl = $(       
           `<div id="#forecastCard${[i]}" class="forecastCards bg-white">
              <div id="#forecastInfo${[i]}" class="forecast-info">
                <h5>${cityName + ' '}${currDayFormat}</h5>
                <img src="${weatherIcon}"</img><br>
                <p>Temp: ${FutureForecastTemp}*F </p><br>
                <p>Wind: ${FutureForecastWind} MPH</p><br>
                <p>Humidity: ${FutureForecastHumid} %</p>
              </div>
            </div>
            `);
      
        console.log(FutureForecastCard);
        console.log(FutureForecastDataEl)
      
        FutureForecastCard.append(FutureForecastDataEl);
    }

  var weatherFetchURLnumTwo = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;

  fetch(weatherFetchURLnumTwo ) 
    .then(function (response) {
      return response.json();

    })
    // again taking the json and convefting it into array of objects, sepcifically for the current day forecast
    .then(function (data) {

      console.log(data)

      populateCurrForecast(data)
        
      
    })

    function populateCurrForecast(currForecast){
      var currForecastIcon = currForecast.weather[0].icon;
      var weatherIcon = `https://openweathermap.org/img/wn/${currForecastIcon}@2x.png`
      var currForecastWind = currForecast.wind.speed;
      var currForecastTemp = currForecast.main.temp;
      var currForecastHumid = currForecast.main.humidity;
      var CurrForecastDataEl = $(
        `<div id="CurrForecastCard" class="CurrForecastCard bg-white">
          <div id="currForecastInfo" class="curr-forecast-info">
            <h4>${cityName + " "}${currDayFormat}</h4>
            <img src="${weatherIcon}"</img><br>
            <p>Temp: ${currForecastTemp} *F</p><br>
            <p>Wind: ${currForecastWind} MPH</p><br>
            <p>Humidity: ${currForecastHumid} %</p>
          </div>
        </div>`);

        console.log(currForecastCard);

      currForecastCard.append(CurrForecastDataEl);
      
      function makeRecentCityButtons(){
        
        var localStorageCityButton = $(
          `<button id="recent-cities" class="btn btn-info btn-block mt-1 pt-2 pb-3">${cityName}</button>
          `);
          recentCityDiv.append(localStorageCityButton);
        
      }
        makeRecentCityButtons()
        setLocalStorage()
    }
    
    
  }
  
}
getLocalStorage()
