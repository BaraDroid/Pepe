/**
 * Represents a movable object in the game, inheriting properties from DrawableObject.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * Indicates if the object is mirrored horizontally.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The timestamp of the last hit taken by the object.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The current timestamp.
     * @type {number}
     */
    currentTime = 0;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The vertical acceleration due to gravity.
     * @type {number}
     */
    accelaration = 1;

    /**
     * The current energy level of the object.
     * @type {number}
     */
    energy = 100;

    /**
     * The ID of the interval responsible for applying gravity.
     * @type {number|null}
     */
    gravityId;

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false; 
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.isJumping = true;
        AudioHub.playSoundeffect(AudioHub.JUMP);
        this.speedY = 15;
        this.y = this.speedY;
        if (this.speedY < 0 && this.y > 130) this.isJumping = false;
    }

    /**
     * Applies gravity to the object, making it fall if it's above ground.
     */
    applyGravity() {
        this.gravityId = setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY; 
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is currently above the ground. Throwable objects always return true.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;    
        } else {
            return this.y < 147;    
        }
    }

    /**
     * Checks if the current object is colliding with another movable object.
     * @param {MovableObject} movObj - The other movable object to check for collision.
     * @returns {boolean} - True if the objects are colliding, false otherwise.
     */
    isColliding(movObj) {
        return (
            this.x + this.offset.left + this.width - this.offset.right > movObj.x + movObj.offset.left &&
            this.y + this.offset.top + this.height - this.offset.bottom > movObj.y + movObj.offset.top &&
            this.x + this.offset.left < movObj.x + movObj.offset.left + movObj.width - movObj.offset.right &&
            this.y + this.offset.top < movObj.y + movObj.offset.top + movObj.height - movObj.offset.bottom
        );
    }

    /**
     * Handles the event when the object is hit. It checks for a cooldown period and then reduces energy based on the colliding enemy.
     */
    /**
        * Handles the event when the object is hit. It checks for a cooldown period using {@link MovableObject#cooldownTime}
        * and then reduces energy based on the colliding enemy.
        */
    hit() {
        this.currentTime = new Date().getTime();
        if (this.cooldownTime()) {
            AudioHub.playSoundeffect(AudioHub.HURT);
            this.checkEnemyType();
            if (this.energy < 0) {
                this.energy = 0;
                this.isDead();
            }
            this.lastHit = this.currentTime;
        }
    }

    /**
     * Iterates through all enemies in the current level and checks for collisions.
     * If a collision is detected, it determines the type of the enemy and applies the corresponding damage.
     */
    checkEnemyType() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                this.checkInstanceOfEnemy(enemy);
            }
        });
    }

    /**
     * Checks if the cooldown period since the last hit has elapsed.
     * @returns {boolean} - True if the cooldown has passed, false otherwise.
     */
    cooldownTime() {
        return this.currentTime - this.lastHit >= 1000;
    }

    /**
     * Checks if the object's energy has reached zero, indicating it is dead.
     * @returns {boolean} - True if the energy is 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks the instance type of an enemy and reduces the object's energy accordingly.
     * @param {MovableObject} rival - The enemy object involved in the collision.
     */
    checkInstanceOfEnemy(rival) {
        if (rival instanceof Endboss) {
            this.energy -= 25;
        } else if (rival instanceof Babychicken) {
            this.energy -= 0.5;
        }
        else {
            this.energy -= 8;
        }
    }

/**
     * Handles the event when this object hits an enemy. It applies different effects based on the enemy type.
     * @param {MovableObject} hittedEnemy - The enemy object that was hit.
     */
hitEnemy(hittedEnemy) {
    if (hittedEnemy instanceof Chicken) {
        this.smashEnemy(hittedEnemy);
    }
    if (hittedEnemy instanceof Endboss) {
        AudioHub.playSoundeffect(AudioHub.BOSSHIT);
        this.hurtEndboss(hittedEnemy);
    }
    if (World.chicken.energy < 0) {
        World.chicken.energy = 0;
    }
}

/**
 * Applies damage to the Endboss and manages the hit cooldown and animation flags.
 * @param {Endboss} boss - The Endboss object that was hit.
 */
hurtEndboss(boss) {
    if (boss.wasHit == false) {
        boss.wasHit = true;
        World.chicken.energy -= 20;
        setTimeout(() => {
            boss.wasHit = false;
            boss.hurtAnimationShown = false;
        }, 1200);
    }
    else {
        World.chicken.energy -= 0;
    }
}

    /**
     * Plays a sound effect when a specific type of enemy is smashed.
     * @param {MovableObject} smashedEnemy - The enemy object that was smashed.
     */
    smashEnemy(smashedEnemy) {
        if (smashedEnemy instanceof Babychicken || smashedEnemy instanceof Chicken) {
            AudioHub.playSoundeffect(AudioHub.CHICKENSMASH);
        }
    }

    /**
     * Plays an animation by cycling through an array of images. It also handles a specific alert animation for the Endboss.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this instanceof Endboss && this.isAlert && !this.alertAnimationShown) {
            this.alertImageCounter++;
            if (this.alertImageCounter == images.length + 1) {
                this.alertAnimationShown = true;
                this.isAlert = false;
            }
        }
    }
}