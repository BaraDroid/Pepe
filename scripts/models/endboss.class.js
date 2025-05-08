/**
 * @class Represents the final boss enemy in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /**
     * The fixed y-coordinate of the Endboss.
     * @type {number}
     */
    y = 55;

    /**
     * The height of the Endboss.
     * @type {number}
     */
    height = 400;

    /**
     * The width of the Endboss.
     * @type {number}
     */
    width = 250;

    /**
     * The initial energy/health of the Endboss.
     * @type {number}
     */
    energy = 100;

    /**
     * Offset values for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = {
        top: 150,
        bottom: 200,
        left: 50,
        right: 80,
    };

    /**
     * Flag indicating if the Endboss is dead.
     * @type {boolean}
     */
    chickenDead = false; // Note: 'chickenDead' might be a confusing name for the Endboss's death state. Consider renaming.

    /**
     * Flag indicating if the Endboss is alert.
     * @type {boolean}
     */
    isAlert = false;

    /**
     * Flag indicating if the Endboss is attacking.
     * @type {boolean}
     */
    isAttacking = false;

    /**
     * Flag indicating if the Endboss was recently hit.
     * @type {boolean}
     */
    wasHit = false;

    /**
     * Flag to ensure the alert animation is played only once.
     * @type {boolean}
     */
    alertAnimationShown = false;

    /**
     * Flag to ensure the dead animation sequence is played only once.
     * @type {boolean}
     */
    deadAnimationShown = false;

    /**
     * Flag to control the hurt animation playback.
     * @type {boolean}
     */
    hurtAnimationShown = false;

    /**
     * Counter for the alert animation frames.
     * @type {number}
     */
    alertImageCounter = 0;

    /**
     * Counter for the dead animation frames.
     * @type {number}
     */
    deadImageCounter = 0;

    /**
     * Counter for the hurt animation frames.
     * @type {number}
     */
    wasHitImageCounter = 0;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    /**
     * Array of image paths for the alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    /**
     * Array of image paths for the attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png", // Note: This image path is repeated.
    ];

    /**
     * Creates a new Endboss instance.
     * Loads initial images, sets initial position, and starts the animation loop.
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = Level.level_end_x; // Note: Accessing static property 'level_end_x' on 'Level' directly might cause issues if 'Level' is not initialized or 'level_end_x' is not static.
        this.speed = 0.1 + Math.random() * 0.5; // Initial speed, might be overridden in animateEndboss
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animateEndboss();
    }

    /**
     * Initiates the animation loops for the Endboss's movement and actions.
     * @method animateEndboss
     */
    animateEndboss() {
        setInterval(() => {
            this.checkEndbossMoves();
            this.checkEndbossDeath();
        }, 1000 / 60);
        setInterval(() => {
            if (this.chickenDead) {
                this.playAnimation(this.IMAGES_DEAD);
                this.bossDead();
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.wasHit) {
                this.playHurtAnimation(this.IMAGES_HURT);
            } else if (this.isAlert) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 350);
    }

    /**
     * Controls the Endboss's movement based on its current state.
     * @method checkEndbossMoves
     */
    checkEndbossMoves() {
        if (!this.isAlert && !this.wasHit && !this.chickenDead) {
            this.speed = 0.1 + Math.random() * 0.5;
            this.x -= this.speed;
        }
        if (this.isAlert || this.chickenDead) {
            this.speed = 0; // No movement in these states
        }
    }

    /**
     * Checks if the Endboss's health has reached zero, triggering the death state.
     * @method checkEndbossDeath
     */
    checkEndbossDeath() {
        if (World.chicken.energy <= 0) { // Note: Accessing static property 'chicken' on 'World' directly might cause issues if 'World' is not initialized or 'chicken' is not static.
            this.chickenDead = true;
        }
    }

    /**
     * Plays the hurt animation sequence.
     * @method playHurtAnimation
     * @param {string[]} hurtImages - Array of image paths for the hurt animation.
     */
    playHurtAnimation(hurtImages) {
        if (!this.hurtAnimationShown) {
            this.wasHitImageCounter++;
            this.playAnimation(hurtImages);
            if (this.wasHitImageCounter == hurtImages.length + 1) {
                this.wasHit = false;
                this.hurtAnimationShown = true;
                this.wasHitImageCounter = 0;
            }
        }
    }

    /**
     * Initiates the Endboss's death sequence, including sound effects and transitioning to the win screen.
     * @method bossDead
     */
    bossDead() {
        AudioHub.playSoundeffect(AudioHub.BOSSDEAD);
        setInterval(() => {
            this.y += 3; // Move the image off-screen
        }, 1000 / 60);
        setTimeout(() => {
            this.chickenDead = false; // Reset the dead flag (might not be necessary here)
            getWinScreen();
            AudioHub.stopBackground();
            AudioHub.playSoundeffect(AudioHub.VICTORY);
        }, 2000);
    }
}