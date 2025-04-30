class MovableObject extends DrawableObject {
    //#####################################################
    //################ attributes ##########################
    //#####################################################


    //################ flags ##########################
    otherDirection = false;
    lastHit = 0;
    currentTime = 0;

    //################ falling ##########################
    speedY = 0;
    accelaration = 1;
    energy = 100;

    //#####################################################
    //################ methods ##########################
    //#####################################################

    //################ moving ##########################
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false; //flag in welche Richtung er gespiegelt wird 
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    //################ jumping ##########################
    jump() {
        this.isJumping = true;
        AudioHub.playSoundeffect(AudioHub.JUMP);
        this.speedY = 15; //wenn das 30 war, ist er weg von der canvas gesprungen
        this.y = this.speedY; //ursprünglich speedY auf 30 gesetzt, aber wo haben wir speedY initialisiert?
        if (this.speedY < 0 && this.y > 130) this.isJumping = false;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY; //negative Geschwindigkeit = nach unten
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;    //thr.object should always fall
        } else {
            return this.y < 147;    //alles andere bleibt auf dem Boden
        }
    }

    //################ collisions ##########################
    isColliding(movObj) {
        return (
            this.x + this.offset.left + this.width - this.offset.right > movObj.x + movObj.offset.left &&
            this.y + this.offset.top + this.height - this.offset.bottom > movObj.y + movObj.offset.top &&
            this.x + this.offset.left < movObj.x + movObj.offset.left + movObj.width - movObj.offset.right &&
            this.y + this.offset.top < movObj.y + movObj.offset.top + movObj.height - movObj.offset.bottom
        );
    }

    //################ hits ##########################
    hit() {
        this.currentTime = new Date().getTime();
        if (this.currentTime - this.lastHit >= 3000) {
            AudioHub.playSoundeffect(AudioHub.HURT);
            this.world.level.enemies.forEach((enemy) => {
                //jede Enemysorte nimmt unterschiedlicher Anzahl an Energy weg
                if (this.isColliding(enemy)) {
                    this.checkInstanceOfEnemy(enemy);
                }
            });
            if (this.energy < 0) {
                this.energy = 0;
                this.isDead();
            }
            this.lastHit = this.currentTime;
        }
    }

    isDead() {
        return this.energy == 0;
    }

    checkInstanceOfEnemy(rival) {
        if (rival instanceof Endboss) {
            this.energy -= 25;
            //console.log("endboss!");
        } else if (rival instanceof Babychicken) {
            this.energy -= 0.5;
            //console.log("babychicken!");
        }
        else {
            this.energy -= 8;
            //console.log("chicken!");
        }
    }

    hitEnemy(hittedEnemy) {
        //every enemy take another amount energy away, it´s one energy pool for all enemies
        if(hittedEnemy instanceof Chicken) {
            //console.log('chicken hit with bottel');
            this.smashEnemy(hittedEnemy);
        }
        if (hittedEnemy instanceof Endboss) {
            //hittedEnemy.wasHit = true;
            console.log("Endboss hit!");
            AudioHub.playSoundeffect(AudioHub.BOSSHIT);
            if (hittedEnemy.wasHit == false) {
                hittedEnemy.wasHit = true;
                World.chicken.energy -= 20;
                //console.log(World.chicken.energy);
                //console.log("was Endboss really hit?", hittedEnemy)
                setTimeout(() => {
                    hittedEnemy.wasHit = false;
                    //console.log("tady by to melo byt znova false", hittedEnemy.wasHit),
                    hittedEnemy.hurtAnimationShown = false;
                }, 1200);
            }
            else {
                World.chicken.energy -= 0;
                //console.log("jetzt hat das nichts abgezogen");
            }
        }
        if (World.chicken.energy < 0) {
            World.chicken.energy = 0;
        }
    }

    smashEnemy(smashedEnemy) {
        if (smashedEnemy instanceof Babychicken || smashedEnemy instanceof Chicken) {
            AudioHub.playSoundeffect(AudioHub.CHICKENSMASH);
        } 
    }


    //################ animation ##########################
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

        //das ganze gebe ich als bossDead() direkt in endboss class:

        // else if (this instanceof Endboss && this.chickenDead) {
        //     // console.log("deadImageCounter". this.deadImageCounter);
        //     // this.deadImageCounter++;
        //     // if (this.deadImageCounter == images.length * 1.5) {
        //         AudioHub.playSoundeffect(AudioHub.BOSSDEAD);
        //         this.deadAnimationShown = true;
        //         console.log("there should start endboss dead animation");
        //         setInterval(() => {
        //             this.y += 3; //obrazek se zesune z obrazovky pryc
        //         }, 1000 / 60);
        //         setTimeout(() => {
        //             this.deadAnimationshown = false;
        //             this.chickenDead = false;
        //             console.log("gameover auf true");
        //             getWinScreen();
        //             AudioHub.stopBackground();
        //             AudioHub.playSoundeffect(AudioHub.VICTORY);
        //         }, 2000);
        //    // }
        // }
    }


}
