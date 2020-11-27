let urlStart = "https://api.openweathermap.org/data/2.5/weather?";
let weatherAPIkey = "6e093cb352d4d124394962457cd432bc";

//Queries the openweatherapi
const getWeather = async (lat, lon) => {
  let url =
    urlStart +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    weatherAPIkey;
  const api = await fetch(url);
  if (api.status === 404) {
    console.log("Data not found");
    return null;
  }
  const data = await api.json();
  return data;
};

async function populateWeather(lat, long) {
  let weather = await getWeather(lat, long); //fetch weather data from the API
  let weatherBox = document.getElementById("weatherBox");
  let weatherBoxContent;

  //Delete old content of the weatherbox if it exists
  if (weatherBox.hasChildNodes()) {
    while (weatherBox.firstChild) {
      weatherBox.removeChild(weatherBox.firstChild);
    }
  }

  if (!weather) {
    //getWeather returned null, 404 error on API
    weatherBoxContent = document.createElement("p");
    let error_message = document.createTextNode(
      "Unable to retrieve weather for this location."
    );
    weatherBoxContent.appendChild(error_message);
    weatherBox.appendChild(weatherBoxContent);
  } else {
    let currentWeather = makeCurrentWeather(weather);
    //append our newly-created weather information
    weatherBox.appendChild(currentWeather);
  }
  return;
}

function makeCurrentWeather(weather_data) {
  //create the div containing the current weather conditions for passed-in weather data
  let currentWeaDiv = document.createElement("div");
  currentWeaDiv.className = "weatherCurrent";

  //create the image element that will hold the current weather's icon
//  let weatherIcon = makeWeatherIcon(weather_data.weather[0].icon);
//  currentWeaDiv.appendChild(weatherIcon); //append icon to current weather

  //Create the title
  let title = document.createElement("span");
  let titleText;
  title.className = "weatherTitle";
  if (weather_data.name) {
    titleText = document.createTextNode(
      "Current Weather in: " + weather_data.name
    );
  } else {
    titleText = document.createTextNode(
      "Current Weather at: " +
        weather_data.coord.lat +
        ", " +
        weather_data.coord.lon
    );
  }
  title.appendChild(titleText);

  currentWeaDiv.appendChild(title);
  
  //Fill in the rest of the relevant info
  let relevant = {
    Temperature: weather_data.main.temp + "F",
    Humidity: weather_data.main.humidity + "%",
    Pressure: weather_data.main.pressure + " hPa",
    Conditions: weather_data.weather[0].description,
  };

  for (const key in relevant) {
    if (relevant.hasOwnProperty(key)) {
      const element = relevant[key];
      currentWeaDiv.appendChild(makeWeatherLine(key, element));
    }
  }

  return currentWeaDiv;
}

function makeWeatherLine(title, value) {
  let row = document.createElement("div");
  let titleCell = document.createElement("span");
  titleCell.appendChild(document.createTextNode(title + ": "));
  let valueCell = document.createElement("span");
  valueCell.appendChild(document.createTextNode(value));

  row.appendChild(titleCell);
  row.appendChild(valueCell);

  row.className = "weatherLine";

  return row;
}
