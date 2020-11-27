console.log("spot mobile detail js starting")


function initMap(latlngString){
    console.log("initMap running")
    let parsedLocation = latlngString.split(', ');
    let parsedLat = parseFloat(parsedLocation[0]);
    let parsedLng = parseFloat(parsedLocation[1]);
    window.map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: {lat: parsedLat, lng: parsedLng}, //portland state university
    });
};

console.log("passed initMap")

function addMarker(latlngString){
    console.log("addMarker running")
    let parsedLocation = latlngString.split(', ');
    let parsedLat = parseFloat(parsedLocation[0]);
    let parsedLng = parseFloat(parsedLocation[1]);
    new google.maps.Marker({
        map,
        position: {lat: parsedLat, lng: parsedLng},
    });
};

console.log("passed addMarker")

document.addEventListener("DOMContentLoaded", () => {
    let indexy = sessionStorage.getItem("indexy");

    console.log("dom content loaded running")
    console.log(`indexy value: ${indexy}`)
    let counter = 0;
    (sessionStorage.getItem("master").split(',,,,,,,,')).forEach(dataPt => {
        parsedDataPt = JSON.parse(dataPt);

        if(counter == indexy){
            initMap(parsedDataPt.location);
            addMarker(parsedDataPt.location);
            document.getElementById("spotname").textContent = parsedDataPt.title;
            console.log(`spotname value: ${document.getElementById("spotname").textContent}`)
            return;
        }
        ++counter;
    });    
});

console.log("spot detail mobile ends")

/*
document.addEventListener("DOMContentLoaded", () => {
    var index = document.getElementById("indexy").value;

    let counter = 0;
    (sessionStorage.getItem("master").split(',,,,,,,,')).forEach(dataPt => {
        parsedDataPt = JSON.parse(dataPt);

        if(counter == index){
            initMap(parsedDataPt.location);
            addMarker(parsedDataPt.location);
            document.getElementById("spotname").textContent = parsedDataPt.title;
            return;
        }
        ++counter;
    });

});
*/

/*
function removeSpot(num){
    if(!confirm("Are you sure you want to delete this foraging location?")){
        return;
    }
    markersList[num].setMap(null);
    var removeDiv = document.querySelector(`#coordinatesBox div:nth-child(${num+1})`);
    removeDiv.style.display = "none";
    let master = sessionStorage.getItem("master").split(',,,,,,,,');
    master.splice(num, 1);
    sessionStorage.setItem("master", master.join(",,,,,,,,"));
    sessionStorage.setItem("newSpot", ""); // this prevents data stored in session from reappearing as a forage spot
    return;
}
*/
