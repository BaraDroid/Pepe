/**
 * Represents the game world, managing all game objects, rendering, and game logic.
 */
class World {
  /**
   * The HTML canvas element for rendering the game.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The 2D rendering context of the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The keyboard input handler.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * The current level of the game.
   * @type {Level}
   */
  level = level1;

  /**
   * The horizontal offset of the camera in the game world.
   * @type {number}
   */
  camera_x = 0;

  /**
   * A static flag indicating if the game is over.
   * @type {boolean}
   */
  static gameOver = false;

  /**
   * The main player character.
   * @type {Character}
   */
  character = new Character();

  /**
   * A static counter for the number of collected bottles.
   * @type {number}
   */
  static collectedBottles = 0;

  /**
   * The number of coins collected by the character.
   * @type {number}
   */
  collectedCoins = 0;

  /**
   * An array of collectable objects in the level.
   * @type {Array<CollectableObject>}
   */
  collectableObjects;

  /**
   * An array of coin objects in the level.
   * @type {Array<Coin>}
   */
  coins;

  /**
   * A static instance of a chicken enemy (likely the initial boss).
   * @type {Chicken}
   */
  static chicken = new Chicken();

  /**
   * The currently thrown bottle object.
   * @type {ThrowableObject|undefined}
   */
  bottle;

  /**
   * An array of throwable bottle objects currently in the game world.
   * @type {Array<ThrowableObject>}
   */
  throwableObjects = [];

  /**
   * The status bar for the character's health.
   * @type {StatusBar}
   */
  statusBar = new StatusBar();

  /**
   * The status bar for the collected coins.
   * @type {Coinsbar}
   */
  coinBar = new Coinsbar();

  /**
   * The status bar for the collected bottles.
   * @type {Bottlesbar}
   */
  bottleBar = new Bottlesbar();

  /**
   * The status bar for the chicken boss's health.
   * @type {Chickenstatus}
   */
  chickenStatusBar = new Chickenstatus();

  /**
   * Creates a new World instance, initializes the canvas and keyboard,
   * sets up the game, and starts the game loop and enemy spawning.
   * @param {HTMLCanvasElement} canvas - The canvas element to render on.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.resetGame();
    this.run();
    this.sendNewEnemies();
  }

  /**
   * Sets the world property for the character, providing a reference to this World instance.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Clears the canvas, applies camera transformations, draws all game elements,
   * resets camera transformations, and requests the next animation frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjects();
    this.ctx.translate(-this.camera_x, 0); 
    this.addIndicators();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds all non-fixed game objects to the map for rendering.
   */
  addObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.coins);
  }

  /**
   * Adds the fixed GUI indicators (status bars) to the map for rendering.
   */
  addIndicators() {
    this.addToMap(this.chickenStatusBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
  }

  /**
   * Placeholder for adding additional figures to the map (currently empty).
   */
  addFigures() {

  }

  /**
   * Adds a single movable object to the canvas for drawing, handling mirroring if necessary.
   * @param {MovableObject} movObj - The movable object to add to the map.
   */
  addToMap(movObj) {
    if (movObj.otherDirection) { 
      this.flipImage(movObj);
    }
    movObj.draw(this.ctx);
    if (movObj.otherDirection) {
      this.flipImageBack(movObj);
    }
  }

  /**
   * Adds an array of movable objects to the map for drawing.
   * @param {Array<MovableObject>} objects - An array of movable objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Flips the image of a movable object horizontally.
   * @param {MovableObject} movObj - The movable object whose image should be flipped.
   */
  flipImage(movObj) {
    this.ctx.save(); 
    this.ctx.translate(movObj.width, 0); 
    this.ctx.scale(-1, 1);
    movObj.x = movObj.x * -1;
  }

  /**
   * Reverses the horizontal flip of a movable object's image.
   * @param {MovableObject} movObj - The movable object whose image should be flipped back.
   */
  flipImageBack(movObj) {
    movObj.x = movObj.x * -1;
    this.ctx.restore();
  }

  /**
   * Sets up the main game loop intervals for checking collisions and game states.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrownObjects();
      this.checkDistanceToEndboss();
    }, 300);
    setInterval(() => {
      this.checkCollisionFromJump();
      this.checkCollisionsWithCollectableBottles();
      this.checkCollisionsWithCoins();
      this.checkCollisionsWithThrowableBottles();
    }, 1000 / 80);
  }

  /**
   * Initiates the spawning of new enemies in the level.
   */
  sendNewEnemies() {
    this.sendChicken();
    this.sendBabychicken();
  }

  /**
   * Sets up an interval to periodically spawn new chicken enemies.
   */
  sendChicken() {
    setInterval(() => {
      let newX = Level.level_end_x + 500 + 720 * Math.random();
      let newChicken = new Chicken();
      newChicken.x = newX;
      this.level.enemies.push(newChicken);
    }, 500);
  }

  /**
   * Sets up an interval to periodically spawn new baby chicken enemies.
   */
  sendBabychicken() {
    setInterval(() => {
      let newX = Level.level_end_x;
      let newBabychicken = new Babychicken();
      newBabychicken.x = newX;
      this.level.enemies.push(newBabychicken);
    }, 2000);
  }

  /**
   * Checks for collisions between the character and enemies, handling damage and hurt animation.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.y > 146 &&
        enemy.chickenDead == false
      ) {
        this.character.hit(enemy);
        this.character.isHurt();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks for collisions between the character and collectable bottles, updating the bottle count and status bar.
   */
  checkCollisionsWithCollectableBottles() {
    this.level.collectableObjects.forEach((obj) => {
      if (this.character.isColliding(obj)) {
        obj.y = 500;
        World.collectedBottles++;
        AudioHub.playSoundeffect(AudioHub.BOTTLECOLLECT);
        this.bottleBar.setPercentage(World.collectedBottles);
      }
    });
  }

  /**
   * Checks for collisions between the character and coins, updating the coin count and status bar.
   */
  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        coin.y = 500;
        this.collectedCoins++;
        AudioHub.playSoundeffect(AudioHub.COINCOLLECT);
        this.coinBar.setPercentage(this.collectedCoins * 5);
      }
    });
  }

  /**
   * Checks for collisions between throwable bottles and enemies.
   */
  checkCollisionsWithThrowableBottles() {
    this.throwableObjects.forEach((bottle) => {
      for (let index = 0; index < this.level.enemies.length; index++) {
        const enemy = this.level.enemies[index];
        if (bottle.isColliding(enemy)) {
          this.bottleHitEnemy(bottle, enemy);
        }
        else if (!bottle.isColliding(enemy) && bottle.y >= 342 && !bottle.collapse) {
          this.checkCollisionWithGround(bottle);
          this.removeThrowableObject(bottle);
        }
      }
    });
  }

  /**
   * Handles the event when a throwable bottle hits an enemy.
   * @param {ThrowableObject} flask - The throwable bottle that hit the enemy.
   * @param {MovableObject} opponent - The enemy that was hit.
   */
  bottleHitEnemy(flask, opponent) {
    opponent.hitEnemy(opponent);
    flask.collapse = true;
    flask.animateCollapse();
    AudioHub.playSoundeffect(AudioHub.BOTTLETHROW);
    this.removeThrowableObject(flask);
    this.chickenStatusBar.setPercentage(World.chicken.energy);
    if (opponent instanceof Babychicken || opponent instanceof Chicken) {
      opponent.chickenDead = true;
      flask.collapse = true;
      flask.playCollapseAnimation(flask.IMAGES_BROKEN);
      this.removeThrowableObject(flask);
    }
  }

  /**
   * Removes a specific throwable object from the `throwableObjects` array if its `canBeRemoved` flag is true.
   * @param {ThrowableObject} bottleToRemove - The throwable object to remove.
   */
  removeThrowableObject(bottleToRemove) {
    if (bottleToRemove.canBeRemoved) {
      const index = this.throwableObjects.indexOf(bottleToRemove);
      if (index > -1) {
        this.throwableObjects.splice(index, 1);
      }
    }
  }

  /**
   * Handles the collision of a throwable bottle with the ground.
   * @param {ThrowableObject} flask - The throwable bottle that hit the ground.
   */
  checkCollisionWithGround(flask) {
    flask.collapse = true;
    AudioHub.playSoundeffect(AudioHub.BOTTLETHROW);
    flask.animateCollapse();
  }

  /**
   * Checks if the character jumps on a chicken or baby chicken enemy, marking them as dead.
   */
  checkCollisionFromJump() {
    this.level.enemies.forEach((enemy) => {
      if (
        (enemy instanceof Chicken || enemy instanceof Babychicken) &&
        this.character.isColliding(enemy) &&
        this.character.y < 147
      ) {
        enemy.smashEnemy(enemy);
        this.chickenStatusBar.setPercentage(World.chicken.energy);
        enemy.chickenDead = true;
      }
    });
  }

  /**
   * Checks for keyboard input to throw a bottle, creates a new ThrowableObject,
   * adds it to the `throwableObjects` array, and decreases the collected bottle count.
   */
  checkThrownObjects() {
    if (this.keyboard.D && World.collectedBottles > 0) {
      if (!this.character.otherDirection) {
        this.bottle = new ThrowableObject(this.character.x + 50, this.character.y + 110, this.character.otherDirection);
      }
      else if (this.character.otherDirection) {
        this.bottle = new ThrowableObject(this.character.x - 20, this.character.y + 110, this.character.otherDirection);
      }
      this.throwableObjects.push(this.bottle);
      World.collectedBottles--;
      this.bottleBar.setPercentage(World.collectedBottles);
    }
  }

  /**
   * Checks the distance between the character and the end boss to trigger specific behaviors.
   */
  checkDistanceToEndboss() {
    this.checkAlertDistance();
    this.checkAttackDistance();
  }

  /**
   * Checks if the character is within the alert distance of the end boss and sets its `isAlert` flag.
   */
  checkAlertDistance() {
    if (
      this.level.enemies[3].x - this.character.x + this.character.width < 500 &&
      !this.level.enemies[3].isAlert &&
      !this.level.enemies[3].alertAnimationShown
    ) {
      this.level.enemies[3].isAlert = true;
    }
  }

  /**
   * Checks if the character is within the attack distance of the end boss and sets its `isAttacking` flag.
   */
  checkAttackDistance() {
    if (this.level.enemies[3].x - this.character.x + this.character.width < 300) {
      this.level.enemies[3].isAttacking = true;
    } else {
      this.level.enemies[3].isAttacking = false;
    }
  }

    /**
   * Resets the game state, including enemy states, collected items, character energy, and game over flag.
   */
  resetGame() {
    this.level.enemies.chickenDead = false;
    this.level.enemies[3].chickenDead = false;
    World.collectedBottles = 0;
    this.collectedCoins = 0;
    this.character.energy = 100;
    this.level.enemies[3].energy = 100;
    World.gameOver = false;
    World.chicken.energy = 100;
    World.chicken = new Chicken();
  }

}
