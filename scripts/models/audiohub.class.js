class AudioHub {
static BACKGROUND = new Audio('./audio/cucaracha.mp3');

static WALK = new Audio('./audio/footsteps.mp3');
static JUMP = new Audio('./audio/jump_boing.mp3');
static HURT = new Audio('./audio/scream.mp3');
static DEAD = new Audio('./audio/male_yell.mp3'); //eingefügt

static BOTTLECOLLECT = new Audio('./audio/glass_klirr.mp3');
static BOTTLETHROW = new Audio('./audio/glass_broken.mp3');

static COINCOLLECT = new Audio('./audio/glass_short.mp3');

static CHICKENSMASH = new Audio('./audio/chicken_smashed.mp3');
static BOSSENTER = new Audio('./audio/chicken_clucking.mp3');
static BOSSHIT = new Audio('./audio/monster_scream.mp3');
static BOSSDEAD = new Audio('./audio/chicken_kokodak.mp3');

static VICTORY = new Audio('./audio/fanfare.mp3');
static DEFEAT = new Audio('./audio/dead.mp3')//eingefügt

static ALL = [
    AudioHub.BACKGROUND,
    AudioHub.WALK,
    AudioHub.JUMP,
    AudioHub.HURT,
    AudioHub.DEAD,
    AudioHub.BOTTLECOLLECT,
    AudioHub.BOTTLETHROW,
    AudioHub.COINCOLLECT,
    AudioHub.CHICKENSMASH,
    AudioHub.BOSSENTER,
    AudioHub.BOSSHIT,
    AudioHub.BOSSDEAD,
    AudioHub.VICTORY,
    AudioHub.DEFEAT,
];

static backgroundMusicInterval;

    constructor() {
    }

    static playBackground() {
        AudioHub.backgroundMusicInterval = setInterval(() => {
            if(AudioHub.BACKGROUND.readyState === 4) {
                AudioHub.BACKGROUND.volume = 0.1;
                AudioHub.BACKGROUND.play();
            }
        }, 200);
    }

    static stopBackground() {
        AudioHub.BACKGROUND.pause();
        AudioHub.BACKGROUND.currentTime = 0;
        clearInterval(AudioHub.backgroundMusicInterval);
    }

    static playSoundeffect(sound) {
        sound.volume = 0.4;
        sound.play();
    }

    static pauseSoundeffect(sound) {
        sound.pause();
    }

     // Stoppt das Abspielen aller Audiodateien
     static stopAll() {
        AudioHub.ALL.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
            sound.currentTime = 0;
        });
        clearInterval(AudioHub.backgroundMusicInterval);
     }

}