const APIKey = "b8fd273274a528d392087bd0cf821d1e";

var searchButton = $('#searchButton');

var cityInputField = $('#search-input');

var recentCityButton = $('#recent-cities');

var cityChoiceArray = []

var currForecastCard = $('#dailyForecast');

var FutureForecastCard = $('#futureContainer');

var CurrForecastDiv = $('#wholeDailyContainer');

var FutureForecastDiv = $('#wholeFutureContainer');

var currentDay = dayjs();

const futureForecastArray = []

var currDayFormat = currentDay.format('M D, YYYY');

console.log(currDayFormat);

var cityNameLocalStorageArray = []

var recentCityDiv = $('#recentContainer');


function createLocalStorageButtons() {
  if (cityNameLocalStorageArray == null) {
    cityNameLocalStorageArray = []
  }

  for (var i = 0; i > cityNameLocalStorageArray.length; i++) {
    var localStorageCityButton = $(
      `<button id="recent-cities" class="btn recentCities btn-info btn-block mt-1 pt-2 pb-3">${cityNameLocalStorageArray[i]}</button>
    `);
    recentCityDiv.append(localStorageCityButton);
  }
}

function setLocalStorage() {
  if (cityNameLocalStorageArray == null) {
    cityNameLocalStorageArray = []
  }
  localStorage.setItem('recentCities', JSON.stringify(cityNameLocalStorageArray));
  console.log(localStorage);
}


function getLocalStorage() {
  if (cityNameLocalStorageArray == null) {
    cityNameLocalStorageArray = []
  }

  cityNameLocalStorageArray = JSON.parse(localStorage.getItem('recentCities'))
  console.log(cityNameLocalStorageArray)
  createLocalStorageButtons(cityNameLocalStorageArray);
}

function makeRecentCityButtons(name) {

  var localStorageCityButton = $(
    `<button id="recent-cities" class="btn recentCities btn-info btn-block mt-1 pt-2 pb-3">${name}</button>
  `);
  localStorageCityButton.attr('data-name', `${name}`)
  cityNameLocalStorageArray.push(name);
  recentCityDiv.append(localStorageCityButton);
  
}



function populateCurrForecast(currForecast) {

  var currForecastIcon = currForecast.weather[0].icon;
  var weatherIcon = `https://openweathermap.org/img/wn/${currForecastIcon}@2x.png`
  var currForecastWind = currForecast.wind.speed;
  var currForecastTemp = currForecast.main.temp;
  var currForecastHumid = currForecast.main.humidity;
  var CurrForecastDataEl = $(
    `<div id="CurrForecastCard" class="CurrForecastCard bg-white">
    <div id="currForecastInfo" class="curr-forecast-info">
      <h4>${cityChoiceArray[0] + " "}${currDayFormat}</h4>
      <img src="${weatherIcon}"</img><br>
      <p>Temp: ${currForecastTemp} *F</p><br>
      <p>Wind: ${currForecastWind} MPH</p><br>
      <p>Humidity: ${currForecastHumid} %</p>
    </div>
  </div>`);

  console.log(currForecastCard);
  // currForecastCard.removeChildren()
  // if ( currForecastCard.children != null ){
  //   currForecastCard.children().forEach(child => child.remove())
  // }
  currForecastCard.append(CurrForecastDataEl);

  makeRecentCityButtons(cityChoiceArray[0])
  setLocalStorage(cityChoiceArray[0])
}

function populateFutureForecast(futureForecastArray) {

  for (var i = 0; i < futureForecastArray.length; i++) {
    var futureForecastDay = dayjs(futureForecastArray[i].dt_txt).format('M D, YYYY');
    var FutureForecastIcon = futureForecastArray[i].weather[0].icon;
    var weatherIcon = `https://openweathermap.org/img/wn/${FutureForecastIcon}@2x.png`
    console.log(weatherIcon);
    var FutureForecastWind = futureForecastArray[i].wind.speed;
    var FutureForecastTemp = futureForecastArray[i].main.temp;
    var FutureForecastHumid = futureForecastArray[i].main.humidity;
    var FutureForecastDataEl = $(
          `<div id="#forecastCard${[i]}" class="forecastCards bg-white">
            <div id="#forecastInfo${[i]}" class="forecast-info">
              <h5>${cityChoiceArray[0] + ' '}${futureForecastDay}</h5>
              <img src="${weatherIcon}"</img><br>
              <p>Temp: ${FutureForecastTemp}*F </p><br>
              <p>Wind: ${FutureForecastWind} MPH</p><br>
              <p>Humidity: ${FutureForecastHumid} %</p>
            </div>
          </div> `);

    console.log(FutureForecastCard);
    console.log(FutureForecastDataEl);
    // FutureForecastCard.removeChildren();
    // if( FutureForecastCard.children != null ){
    //   FutureForecastCard.children().forEach(child => child.remove())
    // }
    FutureForecastCard.append(FutureForecastDataEl);
  }
}

function makeAPICall() {
  if (cityChoiceArray == null) {
    alert("You must select a city");
    location.reload()
  }
  var cityName = cityChoiceArray[0];
  // getting city name and entering it into api call url
  var weatherFetchURLnumOne = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
  //fetch function number 1 to get the 5 day forecast 
  fetch(weatherFetchURLnumOne)
    .then(function (response) {

      return response.json();
    })
    // taking the json response and converting it into an array of objects 
    .then(function (data) {
      console.log(data);

      // gary gave us this for loop to use 
      var futureForecastArray = []
      for (let i = 0; i < 40; i = i + 8) {
        futureForecastArray.push(data.list[i])

      }
      console.log(futureForecastArray)
      populateFutureForecast(futureForecastArray);

    })

  var weatherFetchURLnumTwo = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;

  fetch(weatherFetchURLnumTwo)
    .then(function (response) {
      return response.json();
    })
    // again taking the json and convefting it into array of objects, sepcifically for the current day forecast
    .then(function (data) {
      console.log(data)

      populateCurrForecast(data)
    })

}


// If I load the page and there's local storage...
// I want to show all the searched items as buttons
// I want to show the most recent search as data on the page



// V V V V V PAGE JUST LOADED / RELOADED HERE AND NOW  V V V V V
getLocalStorage()

$(document).on("click", '#recent-cities', function(event){
  event.preventDefault()
  console.log('hello');
  FutureForecastCard.html('');
  currForecastCard.html('');
  console.log(event.target.getAttribute('data-name'));
  cityChoiceArray = [event.target.getAttribute('data-name')];
  console.log(cityChoiceArray)
  // setLocalStorage(cityChoiceArray[0])

  makeAPICall()
})

searchButton.click(function (event) {
  event.preventDefault();
  console.log(event.target);
  FutureForecastCard.html('');
  currForecastCard.html('');
  cityChoiceArray = [cityInputField.val()];
  console.log(cityChoiceArray)
  setLocalStorage(cityChoiceArray[0])

  makeAPICall()
})