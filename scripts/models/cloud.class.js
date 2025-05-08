/**
 * @class Represents a cloud object in the game background.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * The fixed y-coordinate of the clouds.
   * @type {number}
   */
  y = 0;

  /**
   * The width of the cloud image.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the cloud image.
   * @type {number}
   */
  height = 480;

  /**
   * The horizontal movement speed of the clouds.
   * @type {number}
   */
  speed = 0.12;

  /**
   * Array of image paths for different cloud variations.
   * @type {string[]}
   */
  IMAGES_CLOUDS = [
    'img_pollo_locco/img/5_background/layers/4_clouds/1.png',
    'img_pollo_locco/img/5_background/layers/4_clouds/2.png'
  ];

  /**
   * Creates a new Cloud instance.
   * Loads the cloud image, sets its initial position, and starts the animation.
   * @constructor
   * @param {string} imagePath - The path to the cloud image.
   * @param {number} x - The initial x-coordinate of the cloud.
   * @param {number} y - The initial y-coordinate of the cloud.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath, x, y);
    this.x = x;
    this.y = y;
    this.animateClouds();
  }

  /**
   * Initiates the cloud animation, causing it to move left across the screen.
   * @method animateClouds
   */
  animateClouds() {
    this.moveLeft(); // This method is now defined within the Cloud class.
  }

  /**
   * Moves the cloud to the left at a constant speed.
   * @method moveLeft
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}