/**
 * @class Represents a standard chicken enemy in the game.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /**
   * The initial vertical position of the chicken.
   * @type {number}
   */
  y = 330;

  /**
   * The initial horizontal position of the chicken, appearing randomly off-screen to the right.
   * @type {number}
   */
  x = 720 + Math.random() * 500;

  /**
   * Offset values for collision detection.
   * @type {Object}
   * @property {number} top - Top offset.
   * @property {number} bottom - Bottom offset.
   * @property {number} left - Left offset.
   * @property {number} right - Right offset.
   */
  offset = {
    top: 10,
    bottom: 20,
    left: 10,
    right: 20,
  };

  /**
   * Flag indicating if the chicken is dead.
   * @type {boolean}
   */
  chickenDead = false;

  /**
   * The height of the chicken.
   * @type {number}
   */
  height = 100;

  /**
   * The width of the chicken.
   * @type {number}
   */
  width = 100;

  /**
   * The initial energy/health of the chicken.
   * @type {number}
   */
  energy = 100;

  /**
   * The movement speed of the chicken, with some random variation.
   * @type {number}
   */
  speed = 0.15 + Math.random() * 0.5;

  /**
   * Array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * The image path for the dead state.
   * @type {string}
   */
  IMAGE_DEAD =
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * Creates a new Chicken instance.
   * Loads the initial image and starts the animation loop.
   * @constructor
   */
  constructor() {
    super().loadImage("img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  /**
   * Initiates the animation loops for chicken movement and visual states.
   * @method animate
   */
  animate() {
    setInterval(() => {
      if (!this.chickenDead) {
        this.x -= this.speed;
      } else {
        this.speed = 0;
      }
    }, 1000 / 60);
    setInterval(() => {
      if (!this.chickenDead) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.loadImage(this.IMAGE_DEAD);
        setTimeout(() => {
          this.y = -500;
        }, 2000);
      }
    }, 1000 / 8);
  }

  /**
   * Initiates the animation sequence when the chicken is dead, showing the dead image and moving it off-screen.
   * @method animateItsDead
   */
  animateItsDead() {
    if (this.chickenDead) {
      setInterval(() => {
        this.loadImage(this.IMAGE_DEAD);
      }, 1000 / 8);
      setTimeout(() => {
        this.y = 500;
      }, 1500);
    }
  }
}