class AudioHub {
static BACKGROUND = new Audio('./audio/cucaracha.mp3');

static WALK = new Audio('./audio/footsteps.mp3');
static JUMP = new Audio('./audio/jump_boing.mp3');
static HURT = new Audio('./audio/scream.mp3');
static DEAD = new Audio('./audio/dead.mp3');

static BOTTLECOLLECT = new Audio('./audio/glass_klirr.mp3');
static BOTTLETHROW = new Audio('./audio/glass_broken.mp3');

static COINCOLLECT = new Audio('./audio/glass_short.mp3');

static CHICKENSMASH = new Audio('./audio/chicken_smashed.mp3');
static BOSSENTER = new Audio('./audio/chicken_clucking.mp3');
static BOSSHIT = new Audio('./audio/monster_scream.mp3');
static BOSSDEAD = new Audio('./audio/chicken_kokodak.mp3');

static VICTORY = new Audio('./audio/fanfare.mp3');
static DEFEAT = new Audio('./audio/euphonium.mp3')

    constructor() {
        AudioHub.playBackground(AudioHub.BACKGROUND);
    }

    static playBackground(sound) {
        setInterval(() => {
            if(sound.readyState === 4) {
                sound.volume = 0.5;
                sound.play();
            }
        }, 200);
    }

}