let map;

document.addEventListener("DOMContentLoaded", () => {
    if(!(/forage=true/.test(document.cookie))){
        document.getElementById("welcomeOverlay").style.display = "block";
        document.cookie = 'forage=true; sameSite=none secure';
    }else{
        document.getElementById("welcomeOverlay").style.display = "none";
    }
});

const clearOverlay = () => {
    document.getElementById("welcomeOverlay").style.display = "none";
    document.cookie = 'forage=true';
};

document.addEventListener("DOMContentLoaded", () => {
    initMap();

    let rawMaster = sessionStorage.getItem("master");
    let rawData = sessionStorage.getItem("newSpot");

    if(!rawData){
        return;
    }else if(!rawMaster && rawData){
        sessionStorage.setItem("master", rawData);
    }else if(rawMaster && rawData){
        if(!(rawMaster.includes(rawData))){
            rawMaster += ",,,,,,,,"; // I'm using this as a delimiter
            rawMaster += rawData;
            sessionStorage.setItem("master", rawMaster);
        }
    }

    (sessionStorage.getItem("master").split(',,,,,,,,')).forEach(dataPt => {
        parsedDataPt = JSON.parse(dataPt);
        addSpot(parsedDataPt.title, parsedDataPt.specie, parsedDataPt.detail, parsedDataPt.location);
        addMarker(parsedDataPt.location);
    });
});

function addSpot(name, specie, detail, latlng){
    document.getElementById("coordinatesBox").innerHTML += `Name: ${name}<br>Species: ${specie}<br>Details: ${detail}<br>Location: ${latlng}<br><br>`
};

function initMap(){
    map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: { lat: 45.5111, lng: -122.6834 }, //portland state university
    });


};

function addMarker(latlngString){
    let parsedLocation = latlngString.split(', ');
    let parsedLat = parseFloat(parsedLocation[0]);
    let parsedLng = parseFloat(parsedLocation[1]);
    new google.maps.Marker({
        map,
        position: {lat: parsedLat, lng: parsedLng},
    });
};