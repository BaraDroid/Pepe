class Bottlesbar extends StatusBar {
    //#####################################################
    //################ attributes ##########################
    //#####################################################
    y = 125;
    percentage = World.collectedBottles * 100 / 14;   //100% ist meine maximale mögliche Anzahl an Flaschen
    //also 1 Flasche = 7,14 Procent, 2 = 14,28 und 14 = 100;

//################ images ##########################
    IMAGES_BAR = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle//green/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle//green/100.png'
    ];

    //#####################################################
    //################ constructor ##########################
    //#####################################################
    constructor() {
        super().loadImage('img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.loadImages(this.IMAGES_BAR);
    }

    //#####################################################
    //################ methods ##########################
    //#####################################################
    
    setPercentage(percent) { //damit können wir von außen unser percentage setzen
        percent = World.collectedBottles * 100 / 14;  //aus dieser Zahl müssen wir eine Zahl zw. 0 und 5 kriegen//geht bestimmt mit viel Mathematik, er nimmt die leichteste Methode und das ist if Abfrage
        let imagePath = this.IMAGES_BAR[this.receiveImageIndex(percent)];
        // console.log(World.collectedBottles);
        // console.log(percent);
        this.img = this.imageCache[imagePath];
    }

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
        else if (percent >= 0) {
            return 1;
        }
        else {
            return 0;
        }
    }

}