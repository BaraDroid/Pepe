let canvas;
let world;
let keyboard = new Keyboard();
let gameAudio = new AudioHub();
//neni dovoleno, aby na strance rovnou zacala hudba, aniz by user nejdriv nemel nejakou interakci
//TODO dat default ein mutebutton a na jeho click taky muzu s muzikou zacit, ale pak mi to zacne cely odznova, kdyz zacnu hru?

function clearAllIntervals() {  //endet alle Intervale, so dass nichts im Hintergrund läuft
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

function startNewGame() {
    AudioHub.playBackground();
    document.getElementById("myBody").innerHTML = "";
    document.getElementById("myBody").innerHTML = getCanvasTemplate();
    
    init();
}

function getHomeScreen(){
    document.getElementById("myBody").innerHTML = "";
    document.getElementById("myBody").innerHTML = getHomeScreenTemplates();
    clearLevel();
    clearAllIntervals();
}

function getImpressumOverlay() {
    document.getElementById("myBody").innerHTML = getImpressumTemplates();
}

function getLegalInformationOverlay() {
    document.getElementById("myBody").innerHTML = getLegalInformationTemplates();
}

function getWinScreen(){
    document.getElementById("myBody").innerHTML = getWonScreenTemplate();
    clearLevel();
    clearAllIntervals();
    
}

function getLossScreen() {
    document.getElementById("myBody").innerHTML = getLossScreenTemplate();
    clearLevel();
    clearAllIntervals();
}


//das muss in Zukunft nur für das btn auf der startseite sein, falls es nur background music abspielt
function unmuteMusic() {
 let buttonImage = document.getElementById("soundBtn").querySelector('img');
 buttonImage.src = "./img_pollo_locco/icons/sound_on_icon.png";
 AudioHub.BACKGROUND.play();
}

//a tady z toho udelat toggle, eine if Abfrage einbauen, falls src muted, unmute a obracene
function muteMusic() {
    let buttonImage = document.getElementById("soundBtn").querySelector('img');
    buttonImage.src = "./img_pollo_locco/icons/sound_muted_icon.png";
    AudioHub.stopAll();
}

function stopMusic() {
    AudioHub.stopAll();
}





function init() {   //die bindet unser Canvas an einer Variablen und dann fügen wir das BIld hinzu
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.resetGame();
    console.log("reseting in init");
    //console.log("My Character is", world["character"]);
    
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});


