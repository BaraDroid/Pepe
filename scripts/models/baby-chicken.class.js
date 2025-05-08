/**
 * @class Represents a smaller, faster chicken enemy in the game.
 * @extends Chicken
 */
class Babychicken extends Chicken {
  /**
   * The initial vertical position of the baby chicken.
   * @type {number}
   */
  y = 380;

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
    left: 10,
    right: 20,
  };

  /**
   * The height of the baby chicken.
   * @type {number}
   */
  height = 50;

  /**
   * The width of the baby chicken.
   * @type {number}
   */
  width = 50;

  /**
   * The initial energy/health of the baby chicken.
   * @type {number}
   */
  energy = 5;

  /**
   * The movement speed of the baby chicken, with some random variation.
   * @type {number}
   */
  speed = 0.17 + Math.random() * 0.5;

  /**
   * Array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * The image path for the dead state.
   * @type {string}
   */
  IMAGE_DEAD =
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /**
   * Creates a new Babychicken instance.
   * Loads the initial image and starts the walking animation.
   * @constructor
   */
  constructor() {
    super().loadImage("img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate(); // Inherited from MovableObject
  }

}