var sample 

const APIKey = "b8fd273274a528d392087bd0cf821d1e";

var searchButton = document.querySelector('.btn-block');

var cityInputField = document.getElementById('#search-input');

// var popularCityOpt = $('#dropdownMenuButton').val();

searchButton.addEventListener('click', function(event){
  event.preventDefault();
  console.log(event.target);

  makeAPICall()

})

function makeAPICall(){

  var cityName = cityInputField.value;
  
  var weatherFetchURLnumOne = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
  fetch(weatherFetchURLnumOne)
    .then(function (response) {
      if(!response.ok){
        throw response.json();
      }
      
      return response.json();
    })
    .then( function (data) {
      console.log(data);
      var lat = data.city.coord.lat;
      var long = data.city.coord.lon;

      var weatherFetchURLnumTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKey}`;

        fetch(weatherFetchURLnumTwo ) 
          .then(function (response) {
            return response.json();

          })
            .then(function (data) {
              for( let i=0; i<40; i=i+8 ){

                const daysInForecast = data.list 

                const futureForecastArr = [] 

                futureForecastArr.push( daysInForecast[i])

                console.log(futureForecastArr)

                const newForecastArr2 = data.list.filter( (_dayObj, idx) => idx % 8 === 0)
                console.log(newForecastArr2)

                return newForecastArr2

              }

        })
    })

}

// This is the array of hour blocks: 8 per day, for a total of 40.

/*
Each date object has a property called "dt", which is a Unix timestamp for the date and time 
of that object's data. The first one is 1681333200.
*/ 

// Create a new array to hold one day block per forecast day.

// iterate over the 40 blocks, but we will do them 8 at a time, so that we get one per day.

// We now have a new array with one record for each day!


/* 
Want to see why arrow functions are cool? Combined with an array method you haven't learned 
yet, we can do all this work in one line of code. We will show you array.filter() later!
*/ 


