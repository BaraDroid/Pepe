class StatusBar extends DrawableObject {
    //#####################################################
    //################ attributes ##########################
    //#####################################################
    x = 25;
    y = 0;
    width = 250;
    height = 65;
    percentage = 100;

    //################ images ##########################
    IMAGES_BAR = [
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    //#####################################################
    //################ constructor ##########################
    //#####################################################
    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR);
        this.setPercentage(100);
    }
    //#####################################################
    //################ methods ##########################
    //#####################################################
    setPercentage(percentage) {
        //damit können wir von außen unser percentage setzen
        this.percentage = percentage; //aus dieser Zahl müssen wir eine Zahl zw. 0 und 5 kriegen//geht bestimmt mit viel Mathematik, er nimmt die leichteste Methode und das ist if Abfrage
        let imagePath = this.IMAGES_BAR[this.receiveHealthBarIndex()];
        this.img = this.imageCache[imagePath];
    }

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
