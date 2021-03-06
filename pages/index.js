function mobilecheck(x) {
    if (x.matches) { // If media query matches
      return true;
    } else {
      return false;
    }
  }

document.addEventListener("DOMContentLoaded", () => {
    var x = window.matchMedia("(max-width: 768px)")
    
    if(mobilecheck(x)){
        window.location.replace(`/index_mobile.html`);
        return
    }
    
    if(!(/forage=true/.test(document.cookie))){
        document.getElementById("welcomeOverlay").style.display = "block";
        document.cookie = 'forage=true; sameSite=none secure';
    }else{
        document.getElementById("welcomeOverlay").style.display = "none";
    }
});

const clearOverlay = () => {
    document.getElementById("welcomeOverlay").style.display = "none";
    document.cookie = 'forage=true; sameSite=none secure';
};

document.addEventListener("DOMContentLoaded", () => {
    initMap();

    let rawMaster = localStorage.getItem("master");
    let rawData = localStorage.getItem("newSpot");

    if(!rawMaster && !rawData){
        return;
    }

    if(!rawMaster && rawData){
        localStorage.setItem("master", rawData);
    }else if(rawMaster && rawData){
        if(!(rawMaster.includes(rawData))){
            rawMaster += ",,,,,,,,"; // I'm using this as a delimiter
            rawMaster += rawData;
            localStorage.setItem("master", rawMaster);
        }
    }

    let counter = 0;
    (localStorage.getItem("master").split(',,,,,,,,')).forEach(dataPt => {
        parsedDataPt = JSON.parse(dataPt);
        addSpot(counter, parsedDataPt.title, parsedDataPt.specie, parsedDataPt.detail, parsedDataPt.location);
        addMarker(parsedDataPt.location);
        ++counter;
    });
});

function addSpot(counter, name, specie, detail, latlng){
    let div = document.createElement("div");
    div.style.display = "block";
    div.innerHTML = `Name: ${name}<br>Species: ${specie}<br>Details: ${detail}<br>Location: ${latlng}<br>`;
    document.getElementById("coordinatesBox").appendChild(div);

    let buttonCenter = document.createElement("button");
    buttonCenter.style.display = "inline-block";
    buttonCenter.style.border = "none";
    buttonCenter.style.background = "lightskyblue";
    buttonCenter.innerHTML = "Center";
    div.appendChild(buttonCenter);
    buttonCenter.addEventListener("click", () => resetCenter(latlng));
    

    let buttonDelete = document.createElement("button");
    buttonDelete.style.display = "inline-block";
    buttonDelete.style.border = "none";
    buttonDelete.style.background = "firebrick";
    buttonDelete.innerHTML = "Delete spot";
    div.appendChild(buttonDelete);
    buttonDelete.addEventListener("click", () => removeSpot(counter));

    div.style.border = "solid";
    div.style.borderWidth = "0.15vw";
    div.style.padding = "0.3vw";
    div.style.margin = "0.1vw";
};

function initMap(){
    window.map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: { lat: 45.5111, lng: -122.6834 }, //portland state university
    });
    window.markersList = [];
};

function addMarker(latlngString){
    let parsedLocation = latlngString.split(', ');
    let parsedLat = parseFloat(parsedLocation[0]);
    let parsedLng = parseFloat(parsedLocation[1]);
    let marker = new google.maps.Marker({
        map,
        position: {lat: parsedLat, lng: parsedLng},
    });
    markersList.push(marker);
    
};

function resetCenter(latlngString){
    let parsedLocation = latlngString.split(', ');
    let parsedLat = parseFloat(parsedLocation[0]);
    let parsedLng = parseFloat(parsedLocation[1]);
    map.setCenter({lat: parsedLat, lng: parsedLng});
    populateWeather(parsedLat, parsedLng);
};

function removeSpot(num){
    if(!confirm("Are you sure you want to delete this foraging location?")){
        return;
    }
    markersList[num].setMap(null);
    var removeDiv = document.querySelector(`#coordinatesBox div:nth-child(${num+1})`);
    removeDiv.style.display = "none";
    let master = localStorage.getItem("master").split(',,,,,,,,');
    master.splice(num, 1);
    localStorage.setItem("master", master.join(",,,,,,,,"));
    localStorage.setItem("newSpot", ""); // this prevents data stored in session from reappearing as a forage spot
    return;
}

