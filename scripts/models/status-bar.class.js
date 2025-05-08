/**
 * Represents a base status bar object that can display a percentage value visually using a series of images.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * The x-coordinate of the status bar on the canvas.
     * @type {number}
     */
    x = 25;

    /**
     * The y-coordinate of the status bar on the canvas.
     * @type {number}
     */
    y = 0;

    /**
     * The width of the status bar on the canvas.
     * @type {number}
     */
    width = 250;

    /**
     * The height of the status bar on the canvas.
     * @type {number}
     */
    height = 65;

    /**
     * The current percentage value represented by the status bar (0-100).
     * @type {number}
     */
    percentage = 100;

    /**
     * An array of image paths representing different percentage levels of the status bar.
     * @type {string[]}
     */
    IMAGES_BAR = [
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    /**
     * Creates a new StatusBar. It preloads the images for the status bar and sets the initial percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR);
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage value to set (0-100).
     */
    setPercentage(percentage) {
        //damit können wir von außen unser percentage setzen
        this.percentage = percentage; //aus dieser Zahl müssen wir eine Zahl zw. 0 und 5 kriegen//geht bestimmt mit viel Mathematik, er nimmt die leichteste Methode und das ist if Abfrage
        let imagePath = this.IMAGES_BAR[this.receiveHealthBarIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Determines the index of the image in `IMAGES_BAR` to display based on the current `percentage`.
     * @returns {number} - The index of the corresponding image in `IMAGES_BAR`.
     */
    receiveHealthBarIndex() {
        if (this.percentage == 100 || this.percentage > 90) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}