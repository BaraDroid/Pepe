/**
 * Represents the status bar for collected coins, visually indicating the number of collected coins.
 * @extends StatusBar
 */
class Coinsbar extends StatusBar {
  /**
   * The y-coordinate of the coins status bar on the canvas.
   * @type {number}
   */
  y = 60;

  /**
   * An array of image paths representing different fill levels of the coin status bar.
   * @type {string[]}
   */
  IMAGES_BAR = [
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
  ];

  /**
   * Creates a new Coinsbar. It loads the initial image and preloads all images for the status bar.
   */
  constructor() {
    super();
    this.loadImage('img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
    this.loadImages(this.IMAGES_BAR);
  }
}