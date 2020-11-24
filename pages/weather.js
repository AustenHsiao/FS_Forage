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

/*document.getElementById("testButton").addEventListener("click", () => {
  if (sessionStorage.currPos) {
    let coordArray = sessionStorage.currPos.split(", ");
    let lat = coordArray[0];
    let long = coordArray[1];
    populateWeather(lat, long);
  }
});*/

async function populateWeather(lat, long) {
  let weather = await getWeather(lat, long); //fetch weather data from the API
  let weatherBox = document.getElementById("weatherBox");
  let weatherBoxContent;

  if (!weather) {
    //getWeather returned null, 404 error on API
    weatherBoxContent = document.createElement("p");
    let error_message = document.createTextNode(
      "Unable to retrieve weather for this location."
    );
    weatherBoxContent.appendChild(error_message);
    weatherBox.appendChild(weatherBoxContent);
  } else {
    //weather successfully retreived
    let tbody = document.createElement("tbody");
    let tableRow;
    let displayValues = {
      Temperature: weather.main.temp,
      Humidity: weather.main.humidity,
      Conditions: weather.weather[0].main,
    };
    weatherBoxContent = document.createElement("table");
    let keys = Object.keys(displayValues);

    keys.forEach((key) => {
      tableRow = makeWeatherRow(key, displayValues[key]);
      tbody.appendChild(tableRow);
      weatherBoxContent.appendChild(tbody);
    });

    weatherBox.appendChild(weatherBoxContent);
  }
  return;
}

function makeWeatherRow(title, value) {
  let row = document.createElement("tr");
  let titleCell = document.createElement("td");
  titleCell.appendChild(document.createTextNode(title));
  let valueCell = document.createElement("td");
  titleCell.appendChild(document.createTextNode(value));

  row.appendChild(titleCell);
  row.appendChild(valueCell);

  return row;
}
