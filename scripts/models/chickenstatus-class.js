class Chickenstatus extends StatusBar {
  //#####################################################
  //################ attributes ##########################
  //#####################################################

    //################ coords & basics ##########################
    x = 445;
    y = 4;
    width = 250;
    height = 65;

    //################ others ##########################
    percentage = World.chicken.energy;

//################ images ##########################    
  IMAGES_BAR = [
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];


  //#####################################################
  //################ constructor ##########################
  //#####################################################
  constructor() {
    super().loadImage("img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png");
    this.loadImages(this.IMAGES_BAR);
  }

  //#####################################################
  //################ methods ##########################
  //#####################################################
  setPercentage(percentage) {  
    let imagePath = this.IMAGES_BAR[this.receiveChickenHealthIndex(percentage)];
    this.img = this.imageCache[imagePath];
  }

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
