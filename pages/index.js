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