/**
 * @class Represents a coin collectable object in the game.
 * @extends CollectableObject
 */
class Coins extends CollectableObject {
    /**
     * The initial x-coordinate of the coin, positioned randomly within the level bounds (but at least 320px from the start).
     * @type {number}
     */
    x = Math.max(320, Level.level_end_x - Math.random() * Level.level_end_x); 

    /**
     * The initial y-coordinate of the coin, positioned randomly between 100 and 200 pixels from the top.
     * @type {number}
     */
    y = 100 + Math.random() * (200 - 100);

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 140;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 140;

    /**
     * Offset values for collision detection.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = {
        top: 45,
        bottom: 90,
        left: 42,
        right: 84,
    };

    /**
     * Array of image paths for the coin animation.
     * @type {string[]}
     */
    IMAGES_COINS = [
        "img_pollo_locco/img/8_coin/coin_1.png",
        "img_pollo_locco/img/8_coin/coin_2.png",
    ];

    /**
     * Creates a new Coins instance.
     * Loads the initial image and starts the coin animation.
     * @constructor
     */
    constructor() {
        super().loadImage("img_pollo_locco/img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);
        this.animateCoins();
    }

    /**
     * Initiates the coin animation loop.
     * @method animateCoins
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000 / 1.5);
    }

    /**
     * Plays the animation by cycling through the provided images.
     * @method playAnimation
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}