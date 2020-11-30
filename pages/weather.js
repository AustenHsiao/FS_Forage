let weatherAPIkey = "6e093cb352d4d124394962457cd432bc";

//uses the openweatherapi for the current weather
//at the given coordinates.
//returns the current weather conditions only
const getCurrentWeather = async (lat, lon) => {
  //build URL
  let urlStart = "https://api.openweathermap.org/data/2.5/weather?";
  let url =
    urlStart +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    weatherAPIkey;
  //fetch the url and await the result
  const api = await fetch(url);
  if (api.status === 404) {
    //if 404 return
    console.log("Data not found");
    return null;
  }
  const data = await api.json(); //make data json format
  return data;
};

//uses the openweatherapi for the current weather
//at the given coordinates.
//Will return a json object containing an array of
//objects that represent the current day and next
//week of weather
const getDailyWeather = async (lat, lon) => {
  //make URL
  let urlStart = "https://api.openweathermap.org/data/2.5/onecall?";
  let url =
    urlStart +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=current,minutely,hourly,alerts" +
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

//uses the openweather icon api tofetch an icon
//using the passed-in icon string
//Will return an icon corresponding to the icon string
function makeWeatherIcon(icon_string) {
  //makeURL
  let weatherURL = "https://openweathermap.org/img/wn/" + icon_string + ".png";
  //make image
  let imageElement = new Image(50, 50);
  imageElement.src = weatherURL;
  imageElement.className = "weatherImage";
  imageElement.setAttribute("alt", "icon describing the weather");
  return imageElement;
}

//Creates a div with two spans inside,
//one with title, and one with value
function makeWeatherLine(title, value) {
  let row = document.createElement("div");
  if (!(title === "")) {
    let titleCell = document.createElement("span");
    titleCell.appendChild(document.createTextNode(title + ": "));
    row.appendChild(titleCell);
  }

  let valueCell = document.createElement("span");
  valueCell.appendChild(document.createTextNode(value));
  row.appendChild(valueCell);
  row.className = "weatherLine";

  return row;
}

//Creates a div holding weather information for a day's data passed in
//day name, icon, high, low, and conditions
function makeWeatherDay(dailyData) {
  let date = new Date(dailyData.dt * 1000);

  //make div to hold the day's info
  let dayDiv = document.createElement("div");
  dayDiv.className = "weatherDaily";

  //make a span to hold the name of the day
  let dayNameSpan = document.createElement("span");
  dayNameSpan.appendChild(
    document.createTextNode(date.toDateString().split(" ")[0])
  );
  dayNameSpan.className = "weatherDay";
  dayDiv.appendChild(dayNameSpan);

  //make an icon for the current weather
  let dayIcon = makeWeatherIcon(dailyData.weather[0].icon);
  dayDiv.appendChild(dayIcon);

  //Fill in the rest of the relevant info
  dayDiv.appendChild(makeWeatherLine("High", dailyData.temp.max + "F"));
  dayDiv.appendChild(makeWeatherLine("Low", dailyData.temp.min + "F"));
  dayDiv.appendChild(makeWeatherLine("", dailyData.weather[0].description));

  return dayDiv;
}

//Creates a div holding the information for the current
//weather conditions, which are passed in.
function makeCurrentWeather(weather_data) {
  //create the div containing the current weather conditions for passed-in weather data
  let currentWeaDiv = document.createElement("div");
  currentWeaDiv.className = "weatherCurrent";

  //create the image element that will hold the current weather's icon
  let weatherIcon = makeWeatherIcon(weather_data.weather[0].icon);
  currentWeaDiv.appendChild(weatherIcon); //append icon to current weather

  //Create the title
  let title = document.createElement("span");
  let titleText;
  title.className = "weatherTitle";
  //if a name exists for this location
  if (weather_data.name) {
    titleText = document.createTextNode(
      "Current Weather in: " + weather_data.name
    );
  } else {
    //use coordinates
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

//Creates a div holding the information for the current
//weather conditions at the latitude and longitude passed in
// as well as daily forecasts
async function populateWeather(lat, long) {
  let currentWeather = await getCurrentWeather(lat, long); //fetch weather data from the API
  let dailyWeather = await getDailyWeather(lat, long);
  let weatherBox = document.getElementById("weatherBox");
  let weatherBoxContent;

  //Delete old content of the weatherbox if it exists
  if (weatherBox.hasChildNodes()) {
    while (weatherBox.firstChild) {
      weatherBox.removeChild(weatherBox.firstChild);
    }
  }

  if (!currentWeather) {
    //getWeather returned null, 404 error on API
    weatherBoxContent = document.createElement("p");
    let error_message = document.createTextNode(
      "Unable to retrieve weather for this location."
    );
    weatherBoxContent.appendChild(error_message);
    weatherBox.appendChild(weatherBoxContent);
  } else {
    let currentWeatherDiv = makeCurrentWeather(currentWeather);
    weatherBox.appendChild(currentWeatherDiv);

    //if a response for daily weather exists
    if (dailyWeather) {
      let dailyWeatherDiv;
      //a container for all of the days
      let dailyWeatherContainer = document.createElement("div");
      dailyWeatherContainer.className = "weatherDailyContainer";
      for (let day = 0; day < dailyWeather.daily.length; ++day) {
        //make day
        dailyWeatherDiv = makeWeatherDay(dailyWeather.daily[day]);
        //append day
        dailyWeatherContainer.appendChild(dailyWeatherDiv);
      }
      weatherBox.appendChild(dailyWeatherContainer);
    }
  }
  return;
}

//Creates a div holding the information for the current
//weather conditions at the latitude and longitude passed in
async function populateWeatherMobile(lat, long) {
  let currentWeather = await getCurrentWeather(lat, long); //fetch weather data from the API
  let weatherBox = document.getElementById("weatherBox");
  let weatherBoxContent;

  //Delete old content of the weatherbox if it exists
  if (weatherBox.hasChildNodes()) {
    while (weatherBox.firstChild) {
      weatherBox.removeChild(weatherBox.firstChild);
    }
  }

  if (!currentWeather) {
    //getWeather returned null, 404 error on API
    weatherBoxContent = document.createElement("p");
    let error_message = document.createTextNode(
      "Unable to retrieve weather for this location."
    );
    weatherBoxContent.appendChild(error_message);
    weatherBox.appendChild(weatherBoxContent);
  } else {
    let currentWeatherDiv = makeCurrentWeather(currentWeather);
    weatherBox.appendChild(currentWeatherDiv);
  }
  return;
}
