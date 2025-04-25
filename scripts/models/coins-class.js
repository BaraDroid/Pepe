class Coins extends CollectableObject {
    //#####################################################
    //################ attributes ##########################
    //#####################################################

    //################ coords ##########################
    x = Math.max(320, Level.level_end_x - Math.random() * Level.level_end_x);
    y = 100 + Math.random() * (200 - 100);

    height = 140;
    width = 140;
    offset = {
        top: 45,
        bottom: 90,
        left: 42,
        right: 84,
    };

    //################ images ##########################
    IMAGES_COINS = [
        "img_pollo_locco/img/8_coin/coin_1.png",
        "img_pollo_locco/img/8_coin/coin_2.png",
    ];

    //#####################################################
    //################ constructor ##########################
    //#####################################################
    constructor() {
        super().loadImage("img_pollo_locco/img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);
        this.animateCoins();
    }

    //#####################################################
    //################ methods ##########################
    //#####################################################

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000 / 1.5);
    }

    playAnimation(images) {     //TODO - wie kriege ich das von MovableObject, ohne es hierher zu kopieren?
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
