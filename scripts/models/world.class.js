class World {
  //#####################################################
  //################ attributes ##########################
  //#####################################################

  //################ world ##########################
  canvas;
  ctx;
  keyboard;
  level = level1;
  camera_x = 0; //sonst starten wir in der Mitte

  //################ character ##########################
  character = new Character();
  static collectedBottles = 0; //TODO warum ist hier static und collected coins nicht?
  collectedCoins = 0;
  collectableObjects;
  coins;

  //################ enemy ##########################
  static chicken = new Chicken();
  bottle;
  throwableObjects = [];

  //################ statuses ##########################
  statusBar = new StatusBar();
  coinBar = new Coinsbar();
  bottleBar = new Bottlesbar();
  chickenStatusBar = new Chickenstatus();

  //#####################################################
  //################ constructor ##########################
  //#####################################################
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.sendNewChicken();
  }

  //#####################################################
  //################ methods ##########################
  //#####################################################

  //################ drawings ##########################
  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0); //moves camera with character
    //-------space for fixed objects:--------
    this.addToMap(this.chickenStatusBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(movObj) {
    if (movObj.otherDirection) {  //wir checking das flagg otherDirection, welcher hat Pepe //TODO throwing hat auch so ein flag und dreht mit
      this.flipImage(movObj);
    }
    movObj.draw(this.ctx); //jetzt wird Bild eingefügt, wenn if Bedingung true ist, gespiegelt eingefügt

    //HIER KOMMT DER RECHTECK, DASS WIR IHM DANACH JEDEM GEBEN KÖNNEN
    // movObj.drawFrame(this.ctx);
    // movObj.drawOffsetFrame(this.ctx);

    if (movObj.otherDirection) {
      this.flipImageBack(movObj);
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  flipImage(movObj) {
    this.ctx.save(); //erstmal speichern wir das aktuelle Kontext = die eingefüten Bilder
    this.ctx.translate(movObj.width, 0); //wir verändern die Methode, wie wir die Bilder einfügen
    this.ctx.scale(-1, 1); //und das drehen wir alles um(die x Achse ist minus)
    movObj.x = movObj.x * -1; //sonst fängt die x koordinate auch gespiegelt - also auf anderer Seite und Bild wird versetzt //also drehen wir das mithilfe von -1, unten das gleiche, damit geben wir das zurück
  }

  flipImageBack(movObj) {
    movObj.x = movObj.x * -1;
    this.ctx.restore(); //wenn das wahr ist, dass wir das Kontext verändert haben, ändern wir das wieder zu dem ursprünglichem Wert
  }

  //################ intervals ##########################
  run() {
    setInterval(() => {
      this.checkCollisions(); //check, if an enemy touch Pepe
      this.checkThrownObjects(); //method to throw bottles
      this.checkDistanceToEndboss(); //check the distance and I can put another animation on Endboss
    }, 300);
    setInterval(() => {
      this.checkCollisionFromJump(); //checking, if Pepe jump on Chicken or Babychicken and make them dead
      this.checkCollisionsWithCollectableBottles(); //method for collecting salsa bottles from the ground
      this.checkCollisionsWithCoins(); //check collectiong of golden coins
      this.checkCollisionsWithThrowableBottles(); //checks collisions with salsa bottles, thrown by Pepe
    }, 1000 / 80);
  }

  sendNewChicken() {  //TODO warum ist das nicht bei chickens/babychickens?-weil dort kann ich nicht auf level greifen
    //nach 6 Sekunden werden neue Chicken freigelassen
    setTimeout(() => {
      let newX = Level.level_end_x + 500 + 720 * Math.random();
      let newChicken = new Chicken();
      newChicken.x = newX;
      this.level.enemies.push(newChicken);
      //console.log("new chicken created");
      //tady proste do toho arraye v levelu 1 musim nacpat dalsi tri novy chicken. Jen nevim, jak ho ansprechen!
      //a taky bych chtela, aby tady zacinali az vzadu, jinak muzu "obejit" misto jejich zrodu
    }, 3000);
    setTimeout(() => {
      let newX = Level.level_end_x;
      let newBabychicken = new Babychicken();
      newBabychicken.x = newX;
      this.level.enemies.push(newBabychicken);
    }, 2000);
  }

  //################ collisions ##########################
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.y > 146 &&
        enemy.chickenDead == false
      ) {
        //console.log('Collision with', enemy);
        this.character.hit(enemy);
        this.character.isHurt();
        //console.log(this.character.energy);
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsWithCollectableBottles() {
    this.level.collectableObjects.forEach((obj) => {
      if (this.character.isColliding(obj)) {
        obj.y = 500;
        World.collectedBottles++;
        AudioHub.playSoundeffect(AudioHub.BOTTLECOLLECT);
        console.log(World.collectedBottles);
        this.bottleBar.setPercentage(World.collectedBottles);
      }
    });
  }

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

  checkCollisionsWithThrowableBottles() {
    this.throwableObjects.forEach((bottle) => {
      for (let index = 0; index < this.level.enemies.length; index++) {
        const enemy = this.level.enemies[index];
        if (bottle.isColliding(enemy)) {
          enemy.hitEnemy(enemy);
          bottle.collapse = true;
          AudioHub.playSoundeffect(AudioHub.BOTTLETHROW);
          //console.log("ist collapse true?",bottle.collapse);
          this.chickenStatusBar.setPercentage(World.chicken.energy);
          if(enemy instanceof Babychicken || enemy instanceof Chicken) {
            enemy.chickenDead = true;
          }
        }
        else if (!bottle.isColliding(enemy) && bottle.y >= 342 && !bottle.collapse) {
          this.checkCollisionWithGround(bottle);
        }
      }
    });
  }

  checkCollisionWithGround(flask) {
    AudioHub.playSoundeffect(AudioHub.BOTTLETHROW);
    flask.playCollapseAnimation(flask.IMAGES_BROKEN);
    //console.log('Flasche am boden zerplatzt');
    flask.collapse = true;
  }

  checkCollisionFromJump() {
    // Überprüfen, ob das 'enemy' ein Chicken oder Babychicken ist, da Endboss nicht mit Sprung besiegbar ist
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

  //################ checking flags ##########################
  checkThrownObjects() {
    if (this.keyboard.D && World.collectedBottles > 0) {
      this.bottle = new ThrowableObject(this.character.x + 90, this.character.y + 110);
      this.throwableObjects.push(this.bottle);
      World.collectedBottles--;
      console.log(World.collectedBottles);
      this.bottleBar.setPercentage(World.collectedBottles);
    }
  }

  checkDistanceToEndboss() {
    this.checkAlertDistance();
    this.checkAttackDistance();
  }

  checkAlertDistance() {
    if (
      this.level.enemies[3].x - this.character.x + this.character.width < 500 &&
      !this.level.enemies[3].isAlert &&
      !this.level.enemies[3].alertAnimationShown
    ) {
      //console.log("nah genug");
      this.level.enemies[3].isAlert = true;
    }
  }

  checkAttackDistance() {
    //if (this.character.isColliding(this.level.enemies[3])) {
    if (this.level.enemies[3].x - this.character.x + this.character.width < 300) {
      console.log("attack distance erreicht");
      this.level.enemies[3].isAttacking = true;
    } else {
      this.level.enemies[3].isAttacking = false;
    }
  }


}
