var forageSpot;

let locations = [];

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
}

/*
function initMap() {
    var pos;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }, () => {
        // Browser supports geolocation, but user has denied permission
        pos= { lat: 45.5111, lng: -122.6834 };//portland state university
      });
    } else {
        pos= { lat: 45.5111, lng: -122.6834 };//portland state university
    }

    let map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: pos, 
    });

    google.maps.event.addListener(map, 'click', function(spot) {
        placeMarker(map, spot.latLng);
    });
}
*/

function initMap(){
    let map = new google.maps.Map(document.getElementById("mapBox"), {
        zoom: 13,
        center: { lat: 45.5111, lng: -122.6834 }, //portland state university
    });

    google.maps.event.addListener(map, 'click', function(spot) {
        placeMarker(map, spot.latLng);
    });
};

let nextBtn = document.getElementById('next')

nextBtn.onclick = function switchView(event) {
    event.preventDefault();
    //HIDE THINGS
    document.getElementById('detail').style.visibility="hidden";
    document.getElementById('detail').style.zIndex="-1"
    document.getElementById('namelabel').style.visibility="hidden";
    document.getElementById('namelabel').style.zIndex="-1"
    document.getElementById('nameinput').style.visibility="hidden";
    document.getElementById('nameinput').style.zIndex="-1"
    document.getElementById('specieslabel').style.visibility="hidden";
    document.getElementById('specieslabel').style.zIndex="-1"
    document.getElementById('speciesinput').style.visibility="hidden";
    document.getElementById('speciesinput').style.zIndex="-1"
    document.getElementById('detailslabel').style.visibility="hidden";
    document.getElementById('detailslabel').style.zIndex="-1"
    document.getElementById('detailsinput').style.visibility="hidden";
    document.getElementById('detailsinput').style.zIndex="-1"
    document.getElementById('next').style.visibility="hidden";
    document.getElementById('next').style.zIndex="-1"
    //REVEAL THINGS
    document.getElementById('detail').style.zIndex="2"
    document.getElementById('ziplabel').style.visibility="visible";
    document.getElementById('ziplabel').style.zIndex="1"
    document.getElementById('zipinput').style.visibility="visible";
    document.getElementById('zipinput').style.zIndex="1"
    document.getElementById('mapdiv').style.visibility="visible";
    document.getElementById('mapdiv').style.zIndex="2"
    document.getElementById('mapdiscl').style.visibility="visible";
    document.getElementById('mapdiscl').style.zIndex="1"
    document.getElementById('mapBox').style.visibility="visible";
    google.maps.event.trigger(map, 'resize'); 
    document.getElementById('mapBox').style.zIndex="1"
    document.getElementById('submit').style.visibility="visible";
    document.getElementById('submit').style.zIndex="1";

    document.getElementById('zipinput').focus();
}

