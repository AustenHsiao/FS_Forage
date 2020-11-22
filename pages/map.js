let locations = [];
function initMap(){
    let coord = document.getElementById("coordinatesBox");
    coord.innerHTML = "";
    
        const map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: { lat: 45.5111, lng: -122.6834 }, //portland state university
    });
/* No longer need this event. We will handle adding locations on the 'add spot' page//
    google.maps.event.addListener(map, 'click', function(spot) {
        const forageSpot = new google.maps.Marker({
            position: spot.latLng, 
            map: map,
            draggable: true,
            title: "new foraging spot"
        });
        let latlng = `${forageSpot.position.lat()}, ${forageSpot.position.lng()}`;
        locations = sessionStorage.getItem("forageSpots");
        if(locations){
            coord.innerHTML += `${locations.length+1}: ${latlng} <br>`;
        } 
        sessionStorage.setItem("currPos", latlng);
        let test = sessionStorage.getItem("currPos");
        console.log(test);
    });*/


};