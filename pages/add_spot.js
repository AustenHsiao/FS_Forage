var forageSpot;

function placeMarker(map, location) {
    if(forageSpot>''){
        forageSpot.setPosition(location);
    }else{
        forageSpot = new google.maps.Marker({
            position: location, 
            map: map,
            draggable: true
        });
    }
    sessionStorage.setItem("newLocation", `${forageSpot.position.lat()}, ${forageSpot.position.lng()}`);
    document.getElementById("spotlocation").innerHTML = sessionStorage.getItem('newLocation');
}

function initMap(){
    let map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: { lat: 45.5111, lng: -122.6834 }, //portland state university
    });

    google.maps.event.addListener(map, 'click', function(spot) {
        placeMarker(map, spot.latLng);
    });
};

let submitBtn = document.getElementById('submit')

submitBtn.onclick = function switchView(event) {
    console.log("submit onclick running")
    //VALIDATE ENTRIES
    let nmInpt = document.getElementById('nameinput');
    let spcInpt = document.getElementById('speciesinput');
    let detInpt = document.getElementById('detailsinput');

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (nmInpt.value.trim ==''){
        alert('Please enter a name for this spot')
        return false;
    }

    if (spcInpt.value.trim ==''){
        alert('Please enter which species you find at this spot')
        return false;
    }

    if (detInpt.value.trim ==''){
        alert('Please enter a brief description of the spot')
        return false;
    }

    if(!(forageSpot>'')){
        alert('Please select a location to record by clicking on the map')
        return false;
    }

    let data = {
        title: nmInpt.value,
        specie: spcInpt.value,
        detail: detInpt.value,
        location: sessionStorage.getItem("newLocation")
    };
    sessionStorage.setItem("newSpot", JSON.stringify(data));
}