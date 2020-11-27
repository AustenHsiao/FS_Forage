function initMap(latlngString){
    let parsedLocation = latlngString.split(', ');
    let parsedLat = parseFloat(parsedLocation[0]);
    let parsedLng = parseFloat(parsedLocation[1]);
    window.map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: {lat: parsedLat, lng: parsedLng}, 
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
    populateWeather(parsedLat, parsedLng);
};


document.addEventListener("DOMContentLoaded", () => {
    let indexy = sessionStorage.getItem("indexy");

    let counter = 0;
    (sessionStorage.getItem("master").split(',,,,,,,,')).forEach(dataPt => {
        parsedDataPt = JSON.parse(dataPt);

        if(counter == indexy){
            initMap(parsedDataPt.location);
            addMarker(parsedDataPt.location);
            document.getElementById("spotname").textContent = parsedDataPt.title;
            return;
        }
        ++counter;
    });    
});

function removeSpot(){
    if(!confirm("Are you sure you want to delete this foraging location?")){
        return;
    }

    let indexy = sessionStorage.getItem("indexy");

    let master = sessionStorage.getItem("master").split(',,,,,,,,');
    master.splice(indexy, 1);
    sessionStorage.setItem("master", master.join(",,,,,,,,"));
    sessionStorage.setItem("newSpot", ""); // keep existing spots from being added back to the spots list
    sessionStorage.setItem("indexy", ""); // clear out the selected spot for viewing
    window.location.replace(`/index_mobile.html`);
}

document.getElementById("navi3").addEventListener("click", function(){
    removeSpot();
});