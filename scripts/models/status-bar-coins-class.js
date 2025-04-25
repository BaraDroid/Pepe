class Coinsbar extends StatusBar {
  //#####################################################
  //################ attributes ##########################
  //#####################################################
  y = 60;

  //################ images ##########################
  IMAGES_BAR = [
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
  ];

  //#####################################################
  //################ constructor ##########################
  //#####################################################
  constructor() {
    super();
    this.loadImage('img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
    this.loadImages(this.IMAGES_BAR);
  }


}

