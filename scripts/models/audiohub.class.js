class AudioHub {
    /** @type {HTMLAudioElement} - Background music audio object. */
    static BACKGROUND = new Audio('./audio/cucaracha.mp3'); 
    /** @type {HTMLAudioElement} - Walking sound effect audio object. */
    static WALK = new Audio('./audio/footsteps.mp3'); 
    /** @type {HTMLAudioElement} - Jumping sound effect audio object. */
    static JUMP = new Audio('./audio/jump_boing.mp3');  
    /** @type {HTMLAudioElement} - Hurt sound effect audio object. */
    static HURT = new Audio('./audio/ouch.mp3');  
    /** @type {HTMLAudioElement} - Death sound effect audio object. */
    static DEAD = new Audio('./audio/male_yell.mp3'); 
    /** @type {HTMLAudioElement} - Bottle collect sound effect audio object. */
    static BOTTLECOLLECT = new Audio('./audio/glass_klirr.mp3');    
    /** @type {HTMLAudioElement} - Bottle throw sound effect audio object. */
    static BOTTLETHROW = new Audio('./audio/glass_broken.mp3'); 
    /** @type {HTMLAudioElement} - Coin collect sound effect audio object. */
    static COINCOLLECT = new Audio('./audio/glass_short.mp3');  
    /** @type {HTMLAudioElement} - Chicken smash sound effect audio object. */
    static CHICKENSMASH = new Audio('./audio/chicken_smashed.mp3'); 
    /** @type {HTMLAudioElement} - Boss enter sound effect audio object. */
    static BOSSENTER = new Audio('./audio/chicken_clucking.mp3');
    /** @type {HTMLAudioElement} - Boss hit sound effect audio object. */
    static BOSSHIT = new Audio('./audio/monster_scream.mp3');   
    /** @type {HTMLAudioElement} - Boss dead sound effect audio object. */
    static BOSSDEAD = new Audio('./audio/chicken_kokodak.mp3'); 
    /** @type {HTMLAudioElement} - Victory sound effect audio object. */
    static VICTORY = new Audio('./audio/fanfare.mp3');  
    /** @type {HTMLAudioElement} - Defeat sound effect audio object. */
    static DEFEAT = new Audio('./audio/dead.mp3')
    /** @type {HTMLAudioElement[]} - Array containing all audio objects. */
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
    /** @type {number|undefined} - Interval ID for the background music playback. */
    static backgroundMusicInterval;

    /**
     * Creates an instance of AudioHub.
     */
    constructor() {
    }

  

    /**
     * Starts playing the background music in a loop.
     */
    static playBackground() {
        AudioHub.backgroundMusicInterval = setInterval(() => {
            if(AudioHub.BACKGROUND.readyState === 4) {
                AudioHub.BACKGROUND.volume = 0.1;
                AudioHub.BACKGROUND.play();
            }
        }, 200);
    }

    /**
     * Stops the background music playback.
     */
    static stopBackground() {
        AudioHub.BACKGROUND.pause();
        AudioHub.BACKGROUND.currentTime = 0;
        clearInterval(AudioHub.backgroundMusicInterval);
    }

    /**
     * Plays a given sound effect if the game is not muted.
     * @param {HTMLAudioElement} sound - The audio object to play.
     */
    static playSoundeffect(sound) {
        let mutedState = localStorage.getItem("muted");
        if (mutedState == "no") {
            sound.volume = 0.4;
            sound.play();
        }
        else {
            sound.pause();
            sound.volume = 0;
            sound.currentTime = 0;
        }

    }

    /**
     * Pauses a given sound effect.
     * @param {HTMLAudioElement} sound - The audio object to pause.
     */
    static pauseSoundeffect(sound) {
        sound.pause();
    }

     /**
      * Stops the playback of all audio elements.
      */
     static stopAll() {
        AudioHub.ALL.forEach(sound => {
            sound.pause();  
            sound.currentTime = 0;
        });
        clearInterval(AudioHub.backgroundMusicInterval);
     }

}