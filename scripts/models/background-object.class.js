/**
 * @class Represents a static background element in the game world.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * The default width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The default height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new BackgroundObject instance.
   * Loads the image and sets its initial position.
   * @constructor
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The initial x-coordinate of the background object.
   * @param {number} y - The initial y-coordinate of the background object.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath, x, y);
    this.x = x;
    this.y = y;
  }
}