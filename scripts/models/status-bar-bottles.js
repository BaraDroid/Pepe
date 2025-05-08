/**
 * Represents the status bar for collected bottles, visually indicating the number of collected bottles.
 * @extends StatusBar
 */
class Bottlesbar extends StatusBar {
    /**
     * The y-coordinate of the bottles status bar on the canvas.
     * @type {number}
     */
    y = 125;

    /**
     * The current percentage of collected bottles, based on the global `World.collectedBottles` and a maximum of 14.
     * @type {number}
     */
    percentage = World.collectedBottles * 100 / 14;

    /**
     * An array of image paths representing different fill levels of the bottle status bar.
     * @type {string[]}
     */
    IMAGES_BAR = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle//green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle//green/100.png'
    ];

    /**
     * Creates a new Bottlesbar. It loads the initial image and preloads all images for the status bar.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.loadImages(this.IMAGES_BAR);
    }

    /**
     * Sets the percentage of the bottles status bar based on the current number of collected bottles in the global `World`.
     * It determines the appropriate image to display based on the calculated percentage.
     * @param {number} percent - The percentage to set (this parameter is currently overridden by the number of collected bottles).
     */
    setPercentage(percent) {
        percent = World.collectedBottles * 100 / 14;
        let imagePath = this.IMAGES_BAR[this.receiveImageIndex(percent)];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Determines the index of the image in `IMAGES_BAR` to display based on the given percentage.
     * @param {number} percent - The percentage of collected bottles.
     * @returns {number} - The index of the corresponding image in `IMAGES_BAR`.
     */
    receiveImageIndex(percent) {
        if (percent == 100 || percent > 90) {
            return 5;
        }
        else if (percent >= 78) {
            return 4;
        }
        else if (percent >= 50) {
            return 3;
        }
        else if (percent >= 42) {
            return 2;
        }
        else if (percent >= 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}