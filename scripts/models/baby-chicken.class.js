class Babychicken extends Chicken {
  //#####################################################
  //################ attributes ##########################
  //#####################################################

  //################ coordinaten & offset ##########################
  y = 380;

  offset = {
    top: 10,
    bottom: 20,
    left: 10,
    right: 20,
  };

  //################ other attributes ##########################
  height = 50;
  width = 50;
  energy = 5;
  speed = 0.17 + Math.random() * 0.5;

  //################ images ##########################
  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD =
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  //#####################################################
  //################ constructor ##########################
  //#####################################################
  constructor() {
    super().loadImage("img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate(); //inherited from MovableObject
  }

  //#####################################################
  //################ methods ##########################
  //#####################################################
}
