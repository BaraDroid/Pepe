class Chicken extends MovableObject {
  //#####################################################
  //################ attributes ##########################
  //#####################################################

  //################ coords & offset ##########################
  y = 330;
  x = 720 + Math.random() * 500; //slepice vyrazi na 720px, takze kdyz se dostanu za ne, uz me neohrozi
  //225o je konec levelu, ale jak dostanu level do chicken class?

  offset = {
    top: 10,
    bottom: 20,
    left: 10,
    right: 20,
  };

  //################ flags ##########################
  chickenDead = false;

  //################ others ##########################
  height = 100;
  width = 100;
  energy = 100;
  speed = 0.15 + Math.random() * 0.5;

  //################ images ##########################
  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD =
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  //#####################################################
  //################ constructor ##########################
  //#####################################################
  constructor() {
    super().loadImage("img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  //#####################################################
  //################ methods ##########################
  //#####################################################
  animate() {
    setInterval(() => {
      if (this.chickenDead == false) {
        this.x -= this.speed;
      } else {
        this.speed = 0;
      }
    }, 1000 / 60);
    setInterval(() => {
      if (this.chickenDead == false) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.loadImage(this.IMAGE_DEAD);
        setTimeout(() => {
          this.y = -500;
        }, 2000);
      }
    }, 1000 / 8);
  }

  animateItsDead() {
    if (this.chickenDead == true) {
      setInterval(() => {
        this.loadImage(this.IMAGE_DEAD);
      }, 1000 / 8);
      setTimeout(() => {
        this.y = 500;
      }, 1500);
    }
  }
  
}
