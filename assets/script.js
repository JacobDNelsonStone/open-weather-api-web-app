var sample 

const APIKey = "b8fd273274a528d392087bd0cf821d1e";

var searchButton = document.querySelector('.btn-block');

var cityInputField = document.getElementById('#search-input');

var recentCities = document.getElementById('#recent-cities');

var recentCityButton = document.getElementById("#recent-cities");

var cityChoiceArray = []

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
  
  // var recentCity  = recentCityButton.textContent;
  // cityChoiceArray.splice(0, 1, recentCity);
  // console.log(cityChoiceArray)

  // var cityInputField = document.getElementById('#search-input');

  var cityName = cityChoiceArray[0];
  
  // if( cityTypefield == null && recentCity != null ){
  //   cityName = recentCity;
  //   console.log(cityName)
  // } 
  // if( recentCity == null && cityTypefield != null ) {
  //   cityName = cityTypefield;
  //   console.log(cityName)
  // } else {
  //   alert("You must type in a city :]");
  //   location.reload();
  // }

  // getting city name and entering it into api call url
  var weatherFetchURLnumOne = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
  //fetch function number 1 to get the initial city data
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
      //second api call to fetch the lat and lon from api call 1 to get weather data we will use
      var weatherFetchURLnumTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKey}`;

        fetch(weatherFetchURLnumTwo ) 
          .then(function (response) {
            return response.json();

          })
          // again taking the json and convefting it into array of objects, sepcifically for the 5 day forecast we would like
            .then(function (data) {
              // gary gave us this for loop to use 
              for( let i=0; i<40; i=i+8 ){

                const daysInForecast = data.list 

                const futureForecastArray = [] 

                futureForecastArray.push( daysInForecast[i])

                console.log(futureForecastArray)

                const newForecastArray2 = data.list.filter( (_dayObj, idx) => idx % 8 === 0)
                console.log(newForecastArray2)

                return newForecastArray2

              }



        })
    })

}


