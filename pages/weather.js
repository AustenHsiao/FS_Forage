//HARDCODED 11/15+++++++++++++++WIP++++++++++++++++++
const cityName = 'Portland';
const stateCode = 'Oregon';

const getWeather = async () => { 
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&appid=6e093cb352d4d124394962457cd432bc`);
    if(api.status === 404){
        console.log("Data not found");
        return null;
    }

    const data = await api.json();
    console.log(data)
    return data;
}

const getMap = async () => { 
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&appid=6e093cb352d4d124394962457cd432bc`);
    if(api.status === 404){
        console.log("Data not found");
        return null;
    }

    const data = await api.json();
    console.log(data)
    return data;
}

document.getElementById("testButton").addEventListener("click", () =>{
    const weather = getWeather();
    if(!weather){
        ReactDOM.render(
            React.createElement('h1', null, "No data found for location"),
            document.getElementById('weatherBox')
        );
    }else{
        ReactDOM.render(
            React.createElement('h1', null, `Weather for ${cityName},${stateCode}`),
            document.getElementById('weatherBox')
        );
    }
});