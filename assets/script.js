var sample 

const APIKey = "b8fd273274a528d392087bd0cf821d1e";

var searchButton = $('#searchButton');

var cityInputField = $('#search-input');

var recentCityButton = $("#recent-cities");

var cityChoiceArray = []

var currForecastCard = $('#dailyForecast');

var currentDay = dayjs();

var currDayFormat = currentDay.format('M D, YYYY');

console.log(currDayFormat);


// var popularCityOpt = $('#dropdownMenuButton').val();

searchButton.click( function(event){
  event.preventDefault();
  console.log(event.target);
  var cityTypefield = cityInputField.val();

  cityChoiceArray.splice(0, 1, cityTypefield);
  console.log(cityChoiceArray)  

  makeAPICall()

})

recentCityButton.click( function(e){
  e.preventDefault()
  console.log(e.target);
  var recentCity = recentCityButton.text();

  cityChoiceArray.splice(0, 1, recentCity);
  console.log(cityChoiceArray)

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
      var lat = data.city.coord.lat;
      var long = data.city.coord.lon;
      getNumberOfDays(data)
    function getNumberOfDays(){  // gary gave us this for loop to use 
    for( let i=0; i<40; i=i+8 ){

      const daysInForecast = data.list 

      const futureForecastArray = [] 

      futureForecastArray.push(daysInForecast[i])

      console.log(futureForecastArray)
      populateFutureForecast(data)
      // const newForecastArray2 = data.list.filter( (_dayObj, idx) => idx % 8 === 0)
      // console.log(newForecastArray2)

      // return newForecastArray2
    }
    }
    })

    function populateFutureForecast(FutureForecast){
      var FutureForecastIcon = FutureForecast.weather[0].icon;
      var weatherIcon = `https://openweathermap.org/img/wn/${FutureForecastIcon}@2x.png`
      var FutureForecastWind = FutureForecast.wind.speed;
      var FutureForecastTemp = FutureForecast.main.temp;
      var FutureForecastHumid = FutureForecast.main.humidity;
      var FutureForecastDataEl = $(
        `<div id="FutureForecastCard" class="FutureForecastCard bg-light">
          <div id="forecastInfo" class="curr-forecast-info">
            <h4>${currDayFormat}</h4>
            <img src="${weatherIcon}"</img><br>
            <p>${FutureForecastTemp}</p><br>
            <p>${FutureForecastWind}</p><br>
            <p>${FutureForecastHumid}</p>
          </div>
        </div>`);

        console.log(ForecastCard);

      currForecastCard.append(FutureForecastDataEl);
      
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
        `<div id="CurrForecastCard" class="CurrForecastCard bg-light">
          <div id="forecastInfo" class="curr-forecast-info">
            <h4>${currDayFormat}</h4>
            <img src="${weatherIcon}"</img><br>
            <p>${currForecastTemp}</p><br>
            <p>${currForecastWind}</p><br>
            <p>${currForecastHumid}</p>
          </div>
        </div>`);

        console.log(currForecastCard);

      currForecastCard.append(CurrForecastDataEl);
      
    }
    
    
}


