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
    document.getElementById('ziplabel').style.visibility="visible";
    document.getElementById('ziplabel').style.zIndex="1"
    document.getElementById('zipinput').style.visibility="visible";
    document.getElementById('zipinput').style.zIndex="1"
    document.getElementById('mapdiv').style.visibility="visible";
    document.getElementById('mapdiv').style.zIndex="1"
    document.getElementById('mapdiscl').style.visibility="visible";
    document.getElementById('mapdiscl').style.zIndex="1"
    document.getElementById('mapBox').style.visibility="visible";
    document.getElementById('mapBox').style.zIndex="1"
    document.getElementById('submit').style.visibility="visible";
    document.getElementById('submit').style.zIndex="1";
}