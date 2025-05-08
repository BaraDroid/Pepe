/**
 * Represents an object that can be thrown by the character.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * The height of the throwable object.
     * @type {number}
     */
    height = 120;

    /**
     * The width of the throwable object.
     * @type {number}
     */
    width = 120;

    /**
     * The acceleration due to gravity for this object.
     * @type {number}
     */
    accelaration = 5;

    /**
     * Flag indicating if the bottle should start its collapsing/breaking sequence.
     * @type {boolean}
     */
    collapse = false;

    /**
     * Flag indicating if the bottle is currently in its broken state.
     * @type {boolean}
     */
    brokenBottle = false;

    /**
     * Flag indicating if the broken animation has been fully shown.
     * @type {boolean}
     */
    brokenAnimationShown = false;

    /**
     * Counter for the current frame of the broken animation.
     * @type {number}
     */
    brokenAnimationCounter = 0;

    /**
     * Flag indicating if the throwable object can be removed from the game world.
     * @type {boolean}
     */
    canBeRemoved = false;

    /**
     * Offset values for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = {
        top: 10,
        bottom: 20,
        left: 20,
        right: 40,
    };

    /**
     * ID of the interval controlling the throwing animation and movement.
     * @type {number|null}
     */
    throwIntervalId;

    /**
     * Array of image paths for the throwing animation.
     * @type {string[]}
     */
    IMAGES_THROWN = [
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    /**
     * Array of image paths for the broken bottle animation.
     * @type {string[]}
     */
    IMAGES_BROKEN = [
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    /**
     * Creates a new ThrowableObject. It loads the initial image, preloads animation images,
     * sets the initial position, direction, and starts the throwing action.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     * @param {boolean} characterDirection - The direction the character was facing when thrown (true for left).
     */
    constructor(x, y, characterDirection) {
        super().loadImage("img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_BROKEN);
        this.x = x;
        this.y = y;
        this.otherDirection = characterDirection;
        this.throw();
    }

    /**
     * Initiates the throwing action based on the character's direction.
     */
    throw() {
        if (!this.otherDirection) {
            this.throwRight();
        }
        else if (this.otherDirection) {
            this.throwLeft();
        }
    }

    /**
     * Applies upward velocity and starts an interval for rightward movement and throwing animation.
     */
    throwRight() {
        this.speedY = 45;
        this.applyGravity();
        this.throwIntervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWN);
            this.x += 25;
            this.brokenAnimationShown = false;
            this.brokenAnimationCounter = 0;
        }, 1000 / 15);
    }

    /**
     * Applies upward velocity and starts an interval for leftward movement and throwing animation.
     */
    throwLeft() {
        this.speedY = 45;
        this.applyGravity();
        this.throwIntervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWN);
            this.x -= 25;
            this.brokenAnimationShown = false;
            this.brokenAnimationCounter = 0;
        }, 1000 / 15);
    }

    /**
     * Initiates the collapse/breaking animation sequence.
     */
    animateCollapse() {
        let collapseAnimationInterval = setInterval(() => {
            if (this.collapse) {
                this.brokenBottle = true;
                this.acceleration = 0;
                this.x += 0;
                this.speedY = 0;
                clearInterval(this.gravityId);
                clearInterval(this.throwIntervalId);
                this.playCollapseAnimation(this.IMAGES_BROKEN);
                if (this.brokenAnimationShown) {
                    clearInterval(collapseAnimationInterval);
                }
            }
        }, 1000 / 80);
    }

    /**
     * Plays the animation for the bottle breaking. Once the animation is complete,
     * it sets flags to indicate the bottle is broken and can be removed.
     * @param {string[]} brokenImages - An array of image paths for the broken animation.
     */
    playCollapseAnimation(brokenImages) {
        if (!this.brokenAnimationShown) {
            this.playAnimation(brokenImages);
            this.brokenAnimationCounter++;
            if (this.brokenAnimationCounter >= brokenImages.length) {
                this.brokenBottle = false;
                this.brokenAnimationShown = true;
                this.collapse = false;
                this.canBeRemoved = true;
            }
        }
    }

}