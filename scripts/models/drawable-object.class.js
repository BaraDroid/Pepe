class DrawableObject {
    //#####################################################
    //################ attributes ##########################
    //#####################################################

    //################ coords ##########################
    x;
    y;

    //################ flags ##########################
    currentImage = 0; //for imageCache

    //################ others ##########################
    height;
    width;
    img;
    imageCache = {};

    //#####################################################
    //################ methods ##########################
    //#####################################################
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    //################ delete at the end ##########################
    drawFrame(ctx) {    //draw blue frame, just for visuality, where the image ends
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawOffsetFrame(ctx) {  //image with offset - red frame, just for visual control of collisions
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

}