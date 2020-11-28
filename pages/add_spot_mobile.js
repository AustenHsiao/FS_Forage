var forageSpot;
var pos;

let locations = [];

function placeMarker(map, location) {
  if (forageSpot > "") {
    forageSpot.setPosition(location);
  } else {
    forageSpot = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true,
    });
  }
  localStorage.setItem(
    "newLocation",
    `${forageSpot.position.lat()}, ${forageSpot.position.lng()}`
  );
  //    document.getElementById("spotlocation").innerHTML = localStorage.getItem('newLocation');
}

function center_current() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
    }, () => {
        //don't update the postion variable if they deny it
      });
    } else {
        //don't update the postion variable if system doesn't have functionality
    }
}

function recenter_map() {
    geocoder = new google.maps.Geocoder();

    let zippy = document.getElementById('zipinput').value

    if(!zippy){
        return
    }

    if (zippy.length =5) {
        if(!isNaN(zippy)){

            geocoder = new google.maps.Geocoder();

            geocoder.geocode( { 'address': zippy, 'region': 'US'}, function(results, status) {
            
                if (status == google.maps.GeocoderStatus.OK) {
                    let map = new google.maps.Map(document.getElementById("mapBox"), {
                        zoom: 13,
                        center: results[0].geometry.location
                    });
                
                    google.maps.event.addListener(map, 'click', function(spot) {
                        placeMarker(map, spot.latLng);
                    });

                } else {
                    alert("Recenter failed. Please check the zip code and try again");
                }
            });
        }
    }else{
        alert("Please enter a valid zip code if you wish to recenter the map")
    }

}

function initMap(){
    center_current();
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
    let nmInpt = document.getElementById('nameinput').value;
    let spcInpt = document.getElementById('speciesinput').value;
    let detInpt = document.getElementById('detailsinput').value;

    if (nmInpt ==''){
        alert('Please enter a name for this spot')
        return false;
    }

    if (spcInpt ==''){
        alert('Please enter which species you find at this spot')
        return false;
    }

    if (detInpt ==''){
        alert('Please enter a brief description of the spot')
        return false;
    }

    event.preventDefault();
    //HIDE THINGS
    document.getElementById('h1').style.visibility="hidden";
    document.getElementById('h1').style.zIndex="-1"
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
    document.getElementById('submit').style.zIndex="2";

    console.log(`pos: ${pos}`)

    if(pos){
        let map = new google.maps.Map(document.getElementById("mapBox"), {
            zoom: 13,
            center: pos, //portland state university
        });
    
        google.maps.event.addListener(map, 'click', function(spot) {
            placeMarker(map, spot.latLng);
        });

        document.getElementById("zipinput").addEventListener("focusout", recenter_map)
    }
}

let submitBtn = document.getElementById('submit')

submitBtn.onclick = function switchView(event) {
    let nmInpt = document.getElementById('nameinput').value;
    let spcInpt = document.getElementById('speciesinput').value;
    let detInpt = document.getElementById('detailsinput').value;
    
    console.log(`nmInpt: ${nmInpt}`)
    console.log(`spcInpt: ${spcInpt}`)
    console.log(`detInpt: ${detInpt}`)

    if(!(forageSpot>'')){
        alert('Please select a location to record by clicking on the map')
        return false;
    }

    let data = {
      title: nmInpt,
      specie: spcInpt,
      detail: detInpt,
      location: localStorage.getItem("newLocation"),
    };
    localStorage.setItem("newSpot", JSON.stringify(data));
}
