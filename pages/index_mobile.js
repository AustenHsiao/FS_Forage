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
    document.cookie = 'forage=true; sameSite=none secure';
};

document.addEventListener("DOMContentLoaded", () => {

    let rawMaster = sessionStorage.getItem("master");
    let rawData = sessionStorage.getItem("newSpot");

    if(!rawMaster && !rawData){
        let div = document.createElement("div");
        div.style.display = "block";
        div.innerHTML = `You have not saved any spots yet <br>`;
        document.getElementById("coordinatesBox").appendChild(div);
        return;
    }

    if(!rawMaster && rawData){
        sessionStorage.setItem("master", rawData);
    }else if(rawMaster && rawData){
        if(!(rawMaster.includes(rawData))){
            rawMaster += ",,,,,,,,"; // I'm using this as a delimiter
            rawMaster += rawData;
            sessionStorage.setItem("master", rawMaster);
        }
    }

    var counter = 0;
    (sessionStorage.getItem("master").split(',,,,,,,,')).forEach(dataPt => {
        parsedDataPt = JSON.parse(dataPt);
        addSpot(parsedDataPt.title, parsedDataPt.specie, parsedDataPt.detail, counter);
        ++counter;
    });
});

function addSpot(name, specie, detail, counter){
    let div = document.createElement("div");
    div.style.display = "block";
    div.innerHTML = `Name: ${name}<br>Species: ${specie}<br>Details: ${detail}<br>`;
    document.getElementById("coordinatesBox").appendChild(div);

    div.style.border = "solid";
    div.style.borderWidth = "0.15vw";
    div.style.padding = "0.3vw";
    div.style.margin = "0.1vw";

    div.id=`${counter}`
    div.href=`/spot_detail_mobile.html?id=${div.id}`
    div.style.zIndex="99";
    div.style.cursor="pointer"

    div.addEventListener("click", function(){
        sessionStorage.setItem("indexy", div.id);
        window.location.replace(`${this.href}`)
    });

};
