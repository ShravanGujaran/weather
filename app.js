

const getWeather = (city) => {
  if (city == "") {
    swal("Error!", "Please Enter City!", "error");
    return; // Return to exit the function if the city is empty
  }
  cityName.innerHTML = city;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49da7703b2d50bab507896f3d5b56a7c`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      country.innerHTML = response.sys.country;
      temp.innerHTML = (response.main.temp - 273.15).toFixed(1);
      
      // Convert sunrise and sunset timestamps to human-readable format
      const sunriseTime = new Date(response.sys.sunrise * 1000);
      const sunsetTime = new Date(response.sys.sunset * 1000);
      sunrise.innerHTML = sunriseTime.toLocaleTimeString();
      sunset.innerHTML = sunsetTime.toLocaleTimeString();
      
      min_temp.innerHTML = (response.main.temp_max - 273.15).toFixed(1);
      max_temp.innerHTML = (response.main.temp_min - 273.15).toFixed(1);
      main.innerHTML = response.weather[0].main;
      description.innerHTML = response.weather[0].description;
      let locationIcon = document.querySelector(".weather-icon");
      const { icon } = response.weather[0];
      locationIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"/>`;
      wind.innerHTML = response.wind.deg;
    })
    .catch((err) => console.error(err));
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});


getWeather("Nitte");

const fetchWeatherData = (city, elementIds) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=49da7703b2d50bab507896f3d5b56a7c`
  )
    .then((response) => response.json())
    .then((response) => {
      const { main, coord, weather, sys } = response;
      const tempCelsius = (main.temp - 273.15).toFixed(1);
      const tempMaxCelsius = (main.temp_max - 273.15).toFixed(1);
      const tempMinCelsius = (main.temp_min - 273.15).toFixed(1);
      const feelsLikeCelsius = (main.feels_like - 273.15).toFixed(1);
      const sunriseTime = new Date(sys.sunrise * 1000);
      const sunsetTime = new Date(sys.sunset * 1000);

      elementIds.name.innerHTML = city;
      elementIds.temp.innerHTML = tempCelsius;
      elementIds.tempMax.innerHTML = tempMaxCelsius;
      elementIds.tempMin.innerHTML = tempMinCelsius;
      elementIds.feelsLike.innerHTML = feelsLikeCelsius;
      elementIds.lon.innerHTML = coord.lon;
      elementIds.lat.innerHTML = coord.lat;
      elementIds.sunrise.innerHTML = sunriseTime.toLocaleTimeString();
      elementIds.sunset.innerHTML = sunsetTime.toLocaleTimeString();
      elementIds.main.innerHTML = weather[0].main;
      const locationIcon = elementIds.icon;
      const { icon } = weather[0];
      locationIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"/>`;
    })
    .catch((err) => console.error(err));
};

const cities = [
  {
    name: 'California',
    elementIds: {
      name: CaliforniaName,
      temp: CaliforniaName,
      tempMax: CaliforniaMax,
      tempMin: CaliforniaMin,
      feelsLike: CaliforniaFeels,
      lon: Californialon,
      lat: Californialat,
      sunrise: CaliforniaSunrise,
      sunset: CaliforniaSunset,
      main: main,
      icon: document.getElementById('CaliforniaIcon'),
    },
  },
  {
    name: 'Los Angeles',
    elementIds: {
      name: AngelesName,
      temp: AngelesName,
      tempMax: AngelesMax,
      tempMin: AngelesMin,
      feelsLike: AngelesFeels,
      lon: Angeleslon,
      lat: Angeleslat,
      sunrise: AngelesSunrise,
      sunset: AngelesSunset,
      main: main,
      icon: document.getElementById('AngelesIcon'),
    },
  },
  {
    name: 'San Francisco',
    elementIds: {
      name: FranciscoName,
      temp: FranciscoName,
      tempMax: FranciscoMax,
      tempMin: FranciscoMin,
      feelsLike: FranciscoFeels,
      lon: Franciscolon,
      lat: Franciscolat,
      sunrise: FranciscoSunrise,
      sunset: FranciscoSunset,
      main: main,
      icon: document.getElementById('FranciscoIcon'),
    },
  },
  {
    name: 'Texas',
    elementIds: {
      name: TexasName,
      temp: TexasName,
      tempMax: TexasMax,
      tempMin: TexasMin,
      feelsLike: TexasFeels,
      lon: Texaslon,
      lat: Texaslat,
      sunrise: TexasSunrise,
      sunset: TexasSunset,
      main: main,
      icon: document.getElementById('TexasIcon'),
    },
  },
];

cities.forEach((cityData) => {
  fetchWeatherData(cityData.name, cityData.elementIds);
});
