let canvas;
let world;
let keyboard = new Keyboard();
let gameAudio = new AudioHub();
let playingMusic = false;
//neni dovoleno, aby na strance rovnou zacala hudba, aniz by user nejdriv nemel nejakou interakci
//TODO dat default ein mutebutton a na jeho click taky muzu s muzikou zacit, ale pak mi to zacne cely odznova, kdyz zacnu hru?

function clearAllIntervals() {  //endet alle Intervale, so dass nichts im Hintergrund läuft
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

function startNewGame() {
    playingMusic = true;
    AudioHub.playBackground();
    document.getElementById("myBody").innerHTML = "";
    document.getElementById("myBody").innerHTML = getCanvasTemplate();
    init();
}

function getHomeScreen(){
    stopMusic();
    clearAllIntervals();
    document.getElementById("myBody").innerHTML = "";
    document.getElementById("myBody").innerHTML = getHomeScreenTemplates();
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

//nur für das Homescreenbutton
function toggleMusicOnHomeScreen() {
if(!playingMusic) {
    let buttonImage = document.getElementById("soundBtnHomeScreen").querySelector('img');
    buttonImage.src = "./img_pollo_locco/icons/sound_on_icon.png";
    AudioHub.playBackground();
    playingMusic = true;
}
else if(playingMusic) {
    let buttonImage = document.getElementById("soundBtnHomeScreen").querySelector('img');
    buttonImage.src = "./img_pollo_locco/icons/sound_muted_icon.png";
    AudioHub.stopBackground();
    playingMusic = false;
}
}

function toggleBtnImageInPlayModus() {
    setInterval(() => {
        if(!playingMusic) {
            let buttonImage = document.getElementById("soundBtn").querySelector('img');
            buttonImage.src = "./img_pollo_locco/icons/sound_muted_icon.png";
        }
        else if (playingMusic) {
            let buttonImage = document.getElementById("soundBtn").querySelector('img');
            buttonImage.src = "./img_pollo_locco/icons/sound_on_icon.png";
        }
    }, 200);
}

function toggleMusicInPlayModus() {
    if(!playingMusic) {
        AudioHub.playBackground();
        playingMusic = true;
    }
    else if (playingMusic) {
        stopMusic();
        playingMusic = false;
    }
}

function stopMusic() {
    AudioHub.stopAll();
    //vsechny zvuky se zastavi, ale ja potrebuju, aby se ani nezapinaly, dokud zase nebude dalsi klik
    playingMusic = false;
}

function init() {   //die bindet unser Canvas an einer Variablen und dann fügen wir das BIld hinzu
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.resetGame();
    console.log("reseting in init");
    //console.log("My Character is", world["character"]);
    toggleBtnImageInPlayModus();
    initMobileButtons();
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

function initMobileButtons() {
    addTouchListener('btnMoveLeft', 'LEFT', true);
    addTouchListener('btnJump', 'SPACE', true);
    addTouchListener('btnMoveRight', 'RIGHT', true);
    addTouchListener('btnThrow', 'D', true);
}

window.addEventListener('load', init);

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 77) keyboard.M = false;
    if (event.keyCode == 78) keyboard.N = false;
});

function addTouchListener(id, prop, onVal, offVal) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('touchstart', e => { e.preventDefault(); keyboard[prop] = onVal; });
        btn.addEventListener('touchend', e => { e.preventDefault(); keyboard[prop] = offVal; });
    }
}


