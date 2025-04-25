class Cloud extends MovableObject {
  //#####################################################
  //################ attributes ##########################
  //#####################################################


  y = 0;  //diese ändern sich nicht, dann können wir sie hier lassen
  width = 720;
  height = 480;
  speed = 0.12;

  IMAGES_CLOUDS = [
    'img_pollo_locco/img/5_background/layers/4_clouds/1.png',
    'img_pollo_locco/img/5_background/layers/4_clouds/2.png'
  ];

  //#####################################################
  //################ constructor ##########################
  //#####################################################
  constructor(imagePath, x, y) {
    super().loadImage(imagePath, x, y);
    this.x = x
    this.y = y;
    this.animateClouds();
  }

  //#####################################################
  //################ methods ##########################
  //#####################################################
  animateClouds() {
    this.moveLeft();   //das befindet sich in movableObject jetzt
  }

  moveLeft() {
    setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60);
}

}