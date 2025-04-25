class CollectableObject extends DrawableObject {
    //#####################################################
    //################ attributes ##########################
    //#####################################################

    //################ coords & offset ##########################
    x = Math.max(100, Level.level_end_x - Math.random() * Level.level_end_x);
    y = 342 + Math.random() * (398 - 342);
    height = 80;
    width = 80;

    offset = {
        top: 10,
        bottom: 20,
        left: 20,
        right: 40
    }

    //################ images ##########################
    IMAGES_BOTTLES_ONGROUND = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    //#####################################################
    //################ constructor ##########################
    //#####################################################
    constructor() {
        super().loadImage(this.IMAGES_BOTTLES_ONGROUND[this.getBottleImage()]);
        this.getBottleImage();
    }

    //#####################################################
    //################ methods ##########################
    //#####################################################
    getBottleImage() {      //get random image from array
        let randomIndex = Math.floor(Math.random() * 2);
        return randomIndex;
    }

}