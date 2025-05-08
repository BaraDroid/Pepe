/**
 * @class Represents the main playable character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * Reference to the game world.
     * @type {World}
     */
    world;

    /**
     * Initial x-coordinate of the character.
     * @type {number}
     */
    x = 120;

    /**
     * Initial y-coordinate of the character.
     * @type {number}
     */
    y = 153;

    /**
     * Offset values for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = {
        top: 140,
        bottom: 140,
        left: 30,
        right: 70,
    };

    /**
     * The height of the character.
     * @type {number}
     */
    height = 280;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 130;

    /**
     * The movement speed of the character.
     * @type {number}
     */
    speed = 5;

    /**
     * Flag indicating if the character was recently hurt.
     * @type {boolean}
     */
    wasHurt = false;

    /**
     * Flag indicating if the character is currently jumping.
     * @type {boolean}
     */
    isJumping = false;

    /**
     * Flag indicating if the character is currently sleeping (idle animation).
     * @type {boolean}
     */
    isSleeping = false;

    /**
     * Flag indicating if the character is in the long sleep (long idle animation).
     * @type {boolean}
     */
    longSleep = false;

    /**
     * Counter for the general animation images.
     * @type {number}
     */
    imageCounter = 0;

    /**
     * Counter for the hurt animation images.
     * @type {number}
     */
    hurtImageCounter = 0;

    /**
     * Counter for the jump animation images.
     * @type {number}
     */
    jumpImageCounter = 0;

    /**
     * Counter for the sleep animation images.
     * @type {number}
     */
    sleepImageCounter = 0;

    /**
     * Counter for the long sleep animation images.
     * @type {number}
     */
    longSleepImageCounter = 0;

    /**
     * Counter for the idle (doing nothing) duration.
     * @type {number}
     */
    doingNothingCounter = 0;

    /**
     * Flag indicating if the hurt animation has been fully shown.
     * @type {boolean}
     */
    hurtAnimationShown = false;

    /**
     * Flag indicating if the jump animation has been fully shown.
     * @type {boolean}
     */
    jumpAnimationShown = false;

    /**
     * Flag indicating if the sleep animation has been fully shown.
     * @type {boolean}
     */
    sleepAnimationShown = false;

    /**
     * Flag indicating if the long sleep animation has been fully shown.
     * @type {boolean}
     */
    longSleepAnimationsShown = false;

    /**
     * Audio object for the walking sound effect.
     * @type {HTMLAudioElement}
     */
    walking_sound = new Audio("audio/footsteps.mp3");

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "img_pollo_locco/img/2_character_pepe/2_walk/W-21.png",
        "img_pollo_locco/img/2_character_pepe/2_walk/W-22.png",
        "img_pollo_locco/img/2_character_pepe/2_walk/W-23.png",
        "img_pollo_locco/img/2_character_pepe/2_walk/W-24.png",
        "img_pollo_locco/img/2_character_pepe/2_walk/W-25.png",
        "img_pollo_locco/img/2_character_pepe/2_walk/W-26.png",
    ];

    /**
     * Array of image paths for the jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        "img_pollo_locco/img/2_character_pepe/3_jump/J-31.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-32.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-33.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-34.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-35.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-36.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-37.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-38.png",
        "img_pollo_locco/img/2_character_pepe/3_jump/J-39.png",
    ];

    /**
     * Array of image paths for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        "img_pollo_locco/img/2_character_pepe/5_dead/D-51.png",
        "img_pollo_locco/img/2_character_pepe/5_dead/D-52.png",
        "img_pollo_locco/img/2_character_pepe/5_dead/D-53.png",
        "img_pollo_locco/img/2_character_pepe/5_dead/D-54.png",
        "img_pollo_locco/img/2_character_pepe/5_dead/D-55.png",
        "img_pollo_locco/img/2_character_pepe/5_dead/D-56.png",
        "img_pollo_locco/img/2_character_pepe/5_dead/D-57.png",
    ];

    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        "img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png",
        "img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png",
        "img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png",
    ];

    /**
     * Array of image paths for the idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    /**
     * Array of image paths for the long idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE_LONG = [
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /**
     * Creates a new Character instance.
     * Loads initial images, applies gravity, and starts the animation loop.
     * @constructor
     */
    constructor() {
        super().loadImage("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates the animation loops for character movement and actions.
     * @method animate
     */
    animate() {
        setInterval(() => {
            this.controlCharacter();
        }, 1000 / 60);
        setInterval(() => {
            this.playCharacterAnimations();
        }, 100);
    }

    /**
     * Controls the character's movement and actions based on keyboard input and game state.
     * Updates the camera position and handles movement, jumping, and idle states.
     * @method controlCharacter
     */
    controlCharacter() {
        this.world.camera_x = -this.x + 100;
        if (this.world.keyboard.RIGHT && this.x < Level.level_end_x) {
            this.goRight();
        } if (this.world.keyboard.LEFT && this.x > 0) {
            this.goLeft();
        } if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.goUp();
        } if (this.world.keyboard.D) {
            this.doingNothingCounter = 0;
        } if (this.isIdle() && this.doesNothing()) {
            this.goSleep();
        }
    }

    /**
     * Checks if the character is currently doing nothing (not in sleep animation or recently hurt).
     * @method doesNothing
     * @returns {boolean} True if the character is doing nothing, false otherwise.
     */
    doesNothing() {
        return !this.sleepAnimationShown &&
            !this.wasHurt
    }

    /**
     * Checks if the character is currently idle (no movement or action keys pressed).
     * @method isIdle
     * @returns {boolean} True if the character is idle, false otherwise.
     */
    isIdle() {
        return !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.SPACE &&
            !this.world.keyboard.D;
    }

    /**
     * Plays the appropriate character animations based on the current state (dead, hurt, jumping, walking, sleeping).
     * @method playCharacterAnimations
     */
    playCharacterAnimations() {
        this.stopsWalking();
        if (this.isDead()) {
            this.playDeadAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playHurtAnimation(this.IMAGES_HURT);
            this.hurtAnimationShown = false;
        } else if (this.isAboveGround() && this.isJumping) {
            this.playJumpAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.isWalking = true;
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isSleeping) {
            this.playSleepingAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Stops the walking sound effect, sets walking and hurt flags to false.
     * @method stopsWalking
     */
    stopsWalking() {
        AudioHub.pauseSoundeffect(AudioHub.WALK);
        this.isWalking = false;
        this.wasHurt = false;
    }

    /**
     * Moves the character to the right, plays walking sound, and resets idle states.
     * @method goRight
     */
    goRight() {
        this.moveRight(); // Inherited from movable object
        AudioHub.playSoundeffect(AudioHub.WALK);
        this.longSleep = false;
        this.isSleeping = false;
        this.sleepAnimationShown = false;
        this.longSleepAnimationShown = false;
        this.hurtAnimationShown = false;
        this.sleepImageCounter = 0;
        this.longSleepAnimationsCounter = 0;
        this.doingNothingCounter = 0;
    }

    /**
     * Moves the character to the left and resets idle states.
     * @method goLeft
     */
    goLeft() {
        this.moveLeft(); // Inherited from movable object
        this.longSleep = false;
        this.isSleeping = false;
        this.sleepAnimationShown = false;
        this.longSleepAnimationShown = false;
        this.hurtAnimationShown = false;
        this.sleepImageCounter = 0;
        this.longSleepAnimationsCounter = 0;
        this.doingNothingCounter = 0;
    }

    /**
     * Makes the character jump and resets idle states.
     * @method goUp
     */
    goUp() {
        this.jump();    // Inherited from movable object
        this.longSleep = false;
        this.isSleeping = false;
        this.sleepAnimationShown = false;
        this.longSleepAnimationShown = false;
        this.hurtAnimationShown = false;
        this.doingNothingCounter = 0;
        this.jumpImageCounter = 0;
        this.longSleepAnimationsCounter = 0;
        this.sleepImageCounter = 0;
    }

    /**
     * Sets the character to the sleeping (idle) state.
     * @method goSleep
     */
    goSleep() {
        this.isSleeping = true;
        this.longSleep = false;
    }

    /**
     * Plays the death animation, stops background music, plays death sound, and navigates to the loss screen.
     * @method playDeadAnimation
     * @param {string[]} imagesDead - Array of image paths for the death animation.
     */
    playDeadAnimation(imagesDead) {
        this.playAnimation(imagesDead);
        AudioHub.stopBackground();
        AudioHub.playSoundeffect(AudioHub.DEAD);
        setTimeout(() => {
            getLossScreen();
            AudioHub.playSoundeffect(AudioHub.DEFEAT);
        }, 2000);
    }

    /**
     * Plays the jumping animation.
     * @method playJumpAnimation
     * @param {string[]} jumpImages - Array of image paths for the jumping animation.
     */
    playJumpAnimation(jumpImages) {
        this.jumpImageCounter++;
        if (this.isJumping && this.jumpImageCounter < jumpImages.length + 1) {
            this.playAnimation(jumpImages);
        }
    }

    /**
         * Plays the sleeping (idle) animation and transitions to the long sleep animation after a duration.
         * @method playSleepingAnimation
         * @param {string[]} images - Array of image paths for the idle animation.
         */
    playSleepingAnimation(images) {
        if (!this.sleepAnimationShown) {
            this.playAnimation(images);
            this.sleepImageCounter++;
            this.doingNothingCounter++;
            if (this.doingNothingCounter >= 37) {
                this.goLongSleeping();
            }
            if (this.sleepImageCounter == images.length * 3 && this.doingNothingCounter >= 37) {
                this.sleepAnimationShown = true;
                this.sleepImageCounter = 0;
                this.playLongSleepAnimation(this.IMAGES_IDLE_LONG);
            }
        }
    }

    /**
     * Sets the character to the long sleeping state and starts the long sleep animation.
     * @method goLongSleeping
     */
    goLongSleeping() {
        this.longSleep = true;
        this.playLongSleepAnimation(this.IMAGES_IDLE_LONG);
    }

    /**
     * Plays the long sleeping (long idle) animation.
     * @method playLongSleepAnimation
     * @param {string[]} images - Array of image paths for the long idle animation.
     */
    playLongSleepAnimation(images) {
        if (this.longSleep)
            if (!this.longSleepAnimationsShown) {
                this.playAnimation(images);
                this.longSleepImageCounter++;
            }
    }

    /**
     * Plays the hurt animation.
     * @method playHurtAnimation
     * @param {string[]} images - Array of image paths for the hurt animation.
     */
    playHurtAnimation(images) {
        if (!this.hurtAnimationShown) {
            this.playAnimation(images);
            this.hurtImageCounter++;
            if (this.hurtImageCounter == images.length + 1) {
                this.hurtAnimationShown = true;
                this.hurtImageCounter = 0;
            }
        }
    }

    /**
     * @namespace Hurt
     * @description Methods and attributes related to the character being hurt.
     */

    /**
     * Checks if the character was recently hit based on the `lastHit` timestamp.
     * @method isHurt
     * @returns {boolean} - True if the character was hit within the last second, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in milliseconds
        timePassed = timePassed / 1000; // Convert to seconds
        return timePassed < 1; // True if hit within the last second
    }

}