/**
 * @class Represents the status bar for the Endboss's health.
 * @extends StatusBar
 */
class Chickenstatus extends StatusBar {
  /**
   * The x-coordinate of the chicken status bar.
   * @type {number}
   */
  x = 445;

  /**
   * The y-coordinate of the chicken status bar.
   * @type {number}
   */
  y = 4;

  /**
   * The width of the chicken status bar.
   * @type {number}
   */
  width = 250;

  /**
   * The height of the chicken status bar.
   * @type {number}
   */
  height = 65;

  /**
   * The current health percentage of the Endboss.
   * @type {number}
   */
  percentage = World.chicken.energy; // Note: Accessing static property 'chicken' on 'World' directly might cause issues if 'World' is not initialized or 'chicken' is not static.

  /**
   * Array of image paths for the Endboss's health bar.
   * @type {string[]}
   */
  IMAGES_BAR = [
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  /**
   * Creates a new Chickenstatus instance.
   * Loads the initial image for the status bar.
   * @constructor
   */
  constructor() {
    super().loadImage("img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png");
    this.loadImages(this.IMAGES_BAR);
  }

  /**
   * Sets the percentage of the status bar based on the provided health value.
   * Updates the displayed image accordingly.
   * @method setPercentage
   * @param {number} percentage - The current health percentage of the Endboss.
   */
  setPercentage(percentage) {
    let imagePath = this.IMAGES_BAR[this.receiveChickenHealthIndex(percentage)];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Determines the correct image index for the health bar based on the given percentage.
   * @method receiveChickenHealthIndex
   * @param {number} percentage - The current health percentage.
   * @returns {number} - The index of the corresponding image in the `IMAGES_BAR` array.
   */
  receiveChickenHealthIndex(percentage) {
    if (percentage == 100 || percentage > 90) {
      return 5;
    } else if (percentage >= 78) {
      return 4;
    } else if (percentage >= 50) {
      return 3;
    } else if (percentage >= 42) {
      return 2;
    } else if (percentage >= 21) {
      return 1;
    } else {
      return 0;
    }
  }
}