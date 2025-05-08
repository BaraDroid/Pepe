/**
 * @class Represents a generic collectable object in the game, such as a bottle.
 * @extends DrawableObject
 */
class CollectableObject extends DrawableObject {
    /**
     * The initial x-coordinate of the collectable object, positioned randomly within the level bounds (but at least 100px from the start).
     * @type {number}
     */
    x = Math.max(100, Level.level_end_x - Math.random() * Level.level_end_x); // Note: Accessing static property 'level_end_x' on 'Level' directly might cause issues if 'Level' is not initialized or 'level_end_x' is not static.

    /**
     * The initial y-coordinate of the collectable object, positioned randomly between 342 and 398 pixels from the top.
     * @type {number}
     */
    y = 342 + Math.random() * (398 - 342);

    /**
     * The height of the collectable object.
     * @type {number}
     */
    height = 80;

    /**
     * The width of the collectable object.
     * @type {number}
     */
    width = 80;

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
        right: 40
    };

    /**
     * Array of image paths for the bottle on the ground.
     * @type {string[]}
     */
    IMAGES_BOTTLES_ONGROUND = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a new CollectableObject instance.
     * Loads a random image for the bottle.
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLES_ONGROUND[this.getBottleImage()]);
        this.getBottleImage();
    }

    /**
     * Returns a random index to select a bottle image.
     * @method getBottleImage
     * @returns {number} - A random index (0 or 1) for the bottle image array.
     */
    getBottleImage() {
        let randomIndex = Math.floor(Math.random() * 2);
        return randomIndex;
    }
}