var sample 

const APIKey = "b8fd273274a528d392087bd0cf821d1e";

var searchButton = document.querySelector('.btn-block');

var cityInputField = document.getElementById('#search-input');

var recentCities = document.getElementById('#recent-cities');

var recentCityButton = document.getElementById("#recent-cities");

var cityChoiceArray = []

var currForecastCard = document.getElementsByClassName('.forecastContainer');



// var popularCityOpt = $('#dropdownMenuButton').val();

searchButton.addEventListener('click', function(event){
  event.preventDefault();
  console.log(event.target);
  var cityTypefield = cityInputField.value;

  cityChoiceArray.splice(0, 1, cityTypefield);
  console.log(cityChoiceArray)  

  makeAPICall()

})

recentCityButton.addEventListener('click', function(e){
  e.preventDefault()
  console.log(e.target);
  var recentCity  = recentCityButton.textContent;
  cityChoiceArray.splice(0, 1, recentCity);
  console.log(cityChoiceArray)
  makeAPICall()
  return cityChoiceArray[0];


})


function makeAPICall(){
  
  if(cityChoiceArray == "" ){
    alert("You must select a city");
    location.reload()
  }
  // var recentCity  = recentCityButton.textContent;
  // cityChoiceArray.splice(0, 1, recentCity);
  // console.log(cityChoiceArray)

  // var cityInputField = document.getElementById('#search-input');

  var cityName = cityChoiceArray[0];

  // getting city name and entering it into api call url
  var weatherFetchURLnumOne = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
  //fetch function number 1 to get the 5 day forecast 
  fetch(weatherFetchURLnumOne)
    .then(function (response) {
      if(!response.ok){
        throw response.json();
      }
      
      return response.json();
    })
    // taking the json response and converting it into an array of objects 
    .then( function (data) {
      console.log(data);
      var lat = data.city.coord.lat;
      var long = data.city.coord.lon;

      // gary gave us this for loop to use 
    for( let i=0; i<40; i=i+8 ){

      const daysInForecast = data.list 

      const futureForecastArray = [] 

      futureForecastArray.push(daysInForecast[i])

      console.log(futureForecastArray)

      const newForecastArray2 = data.list.filter( (_dayObj, idx) => idx % 8 === 0)
      console.log(newForecastArray2)

      return newForecastArray2


    }
    })

  var weatherFetchURLnumTwo = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;

  fetch(weatherFetchURLnumTwo ) 
    .then(function (response) {
      return response.json();

    })
    // again taking the json and convefting it into array of objects, sepcifically for the current day forecast
    .then(function (data) {

      console.log(data)
    
      const currForecast = data 

      console.log(currForecast)

      populateCurrForecast()
        
      
    })

    function populateCurrForecast(data){
  
      var currForecastIcon = data.weather.icon;
      var currForecastWind = data.wind.speed;
      var currForecastTemp = data.main.temp;
      var currForecastHumid = data.main.humidity;
      var CurrForecastDataEl = $(
        `<div id="#CurrForecastCard" class="CurrForecastCard bg-light">
          <div id="#forecastInfo" class="curr-forecast-info">
            ${currForecastIcon}<br>
            ${currForecastTemp}<br>
            ${currForecastWind}<br>
            ${currForecastHumid}
          </div>
        </div> `);
      CurrForecastDataEl.append(currForecastCard);
      
    }
    
    
}


