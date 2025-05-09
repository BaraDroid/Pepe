let canvas;
let world;
let keyboard = new Keyboard();
let gameAudio = new AudioHub();
let fullScreen = false;

/**
 * Ends all active intervals, so that nothing runs in the background.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Starts a new game. Initializes game state, music, UI, and game world.
 */
function startNewGame() {
    document.getElementById("myBody").innerHTML = "";
    document.getElementById("myBody").innerHTML = getCanvasTemplate();
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    world.resetGame();
    checkMuteAtStart();
    initMobileButtons();
}

/**
 * Navigates to the home screen, stopping music and clearing intervals.
 */
function getHomeScreen() {
    stopMusic();
    clearAllIntervals();
    document.getElementById("myBody").innerHTML = "";
    document.getElementById("myBody").innerHTML = getHomeScreenTemplates();
}

/**
 * Displays the imprint overlay.
 */
function getImpressumOverlay() {
    document.getElementById("myBody").innerHTML = getImpressumTemplates();
}

/**
 * Displays the legal information overlay.
 */
function getLegalInformationOverlay() {
    document.getElementById("myBody").innerHTML = getLegalInformationTemplates();
}

/**
 * Displays the win screen, clearing the level and intervals.
 */
function getWinScreen() {
    document.getElementById("myBody").innerHTML = getWonScreenTemplate();
    clearLevel();
    clearAllIntervals();
}

/**
 * Displays the loss screen, clearing the level and intervals.
 */
function getLossScreen() {
    document.getElementById("myBody").innerHTML = getLossScreenTemplate();
    clearLevel();
    clearAllIntervals();
}

/**
 * Stops all currently playing music.
 */
function stopMusic() {
    AudioHub.stopAll();
}

/**
 * Changes the sound button images to the muted icon.
 */
function changeBtnToMuted() {
    let bigButtonImage = document.getElementById("soundBtn").querySelector('img');
    let smallButtonImage = document.getElementById("muteBtn").querySelector('img');
    bigButtonImage.src = "./img_pollo_locco/icons/sound_muted_icon.png";
    smallButtonImage.src = "./img_pollo_locco/icons/sound_muted_icon.png";
}

/**
 * Changes the sound button images to the sound on icon.
 */
function changeBtnToSound() {
    let bigButtonImage = document.getElementById("soundBtn").querySelector('img');
    let smallButtonImage = document.getElementById("muteBtn").querySelector('img');
    bigButtonImage.src = "./img_pollo_locco/icons/sound_on_icon.png";
    smallButtonImage.src = "./img_pollo_locco/icons/sound_on_icon.png";
}

/**
 * Checks the mute state in local storage at the start and adjusts music accordingly.
 */
function checkMuteAtStart() {
    let mutedState = localStorage.getItem("muted");
    if (mutedState === null) {
        localStorage.setItem("muted", "no");
        checkMuteAtStart();
    }
    else if (mutedState === "yes") {
        stopMusic();
        changeBtnToMuted();
    } else if (mutedState == "no") {
        AudioHub.playBackground();
        changeBtnToSound();
    }
}

/**
 * Toggles the music playback and updates the mute state in local storage.
 */
function toggleMusicInPlayModus() {
    let mutedState = localStorage.getItem("muted");
    if (mutedState == "yes") {
        localStorage.setItem("muted", "no");
        AudioHub.playBackground();
        changeBtnToSound();
    }
    else if (mutedState == "no") {
        localStorage.setItem("muted", "yes");
        stopMusic();
        changeBtnToMuted();
    }
}

/**
 * Event listener for keydown events to control player actions.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
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

/**
 * Event listener for keyup events to stop player actions.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
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

/**
 * Initializes touch event listeners for mobile controls.
 */
function initMobileButtons() {
    addTouchListener('btnMoveLeft', 'LEFT', true);
    addTouchListener('btnJump', 'SPACE', true);
    addTouchListener('btnMoveRight', 'RIGHT', true);
    addTouchListener('btnThrow', 'D', true);
}

/**
 * Another event listener for keyup events, potentially handling different keys.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 77) keyboard.M = false;
    if (event.keyCode == 78) keyboard.N = false;
});

/**
 * Adds touch event listeners to a specific button element.
 * @param {string} id - The ID of the button element.
 * @param {string} prop - The keyboard property to control.
 * @param {*} onVal - The value to set on touchstart.
 * @param {*} [offVal=false] - The value to set on touchend.
 */
function addTouchListener(id, prop, onVal, offVal = false) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('touchstart', e => { e.preventDefault(); keyboard[prop] = onVal; });
        btn.addEventListener('touchend', e => { e.preventDefault(); keyboard[prop] = offVal; });
    }
}

/**
 * Requests fullscreen mode for the canvas.
 */
function getFullScreenMode() {
    let canvas = document.getElementById("canvas");
    canvas.requestFullscreen();
    fullScreen = true;
}