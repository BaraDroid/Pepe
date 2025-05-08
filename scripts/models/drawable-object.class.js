/**
 * @class Represents a base drawable object in the game, providing functionality for loading and drawing images.
 */
class DrawableObject {
    /**
     * The x-coordinate of the drawable object.
     * @type {number|undefined}
     */
    x;

    /**
     * The y-coordinate of the drawable object.
     * @type {number|undefined}
     */
    y;

    /**
     * Index of the current image being displayed, used for animations.
     * @type {number}
     */
    currentImage = 0;

    /**
     * The height of the drawable object.
     * @type {number|undefined}
     */
    height;

    /**
     * The width of the drawable object.
     * @type {number|undefined}
     */
    width;

    /**
     * The currently loaded image element.
     * @type {HTMLImageElement|undefined}
     */
    img;

    /**
     * An object to cache loaded images, using their paths as keys.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Loads a single image and sets it as the `img` property.
     * @method loadImage
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the currently loaded image on the canvas context.
     * @method draw
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths and stores them in the `imageCache`.
     * @method loadImages
     * @param {string[]} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a blue rectangular frame around the drawable object for visual debugging, not used in the final game.
     * Only applied to specific object types.
     * @method drawFrame
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @private
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a red rectangular frame around the drawable object, considering its offset, for visual collision debugging, not used in the final version.
     * Only applied to specific object types.
     * @method drawOffsetFrame
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @private
     */
    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }
}