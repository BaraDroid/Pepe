class Endboss extends MovableObject {
    //#####################################################
    //################ attributes ##########################
    //#####################################################

    y = 55;
    height = 400;
    width = 250;
    energy = 100;

    offset = {
        top: 150,
        bottom: 200,
        left: 50,
        right: 80,
    };

    //################ flags ##########################
    chickenDead = false;
    isAlert = false;
    isAttacking = false;
    wasHit = false;
    alertAnimationShown = false; //Schalter für alert animation, dass sie nur einmal durchgeführt wird
    deadAnimationShown = false;
    hurtAnimationShown = false;

    //################ counter ##########################
    alertImageCounter = 0; //zählt Bilder in der Endanimation, dass sie nur einmal durchgeführt werden
    deadImageCounter = 0;
    wasHitImageCounter = 0;

    //################ images ##########################
    IMAGES_WALKING = [
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_ATTACK = [
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_HURT = [
        "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
        "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    //#####################################################
    //################ constructor ##########################
    //#####################################################
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = Level.level_end_x; //je größerer Zahl, desto weiter weg steht sie
        this.speed = 0.1 + Math.random() * 0.5; //falls das nicht auskommentiert wäre, bewegt er sich nach vorn
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animateEndboss();
    }

    //#####################################################
    //################ methods ##########################
    //#####################################################
    animateEndboss() {
        // setInterval(() => {
        //     if (!this.isAlert && !this.wasHit) {
        //         this.wasHit = false;
        //         this.speed = 0.1 + Math.random() * 0.5;
        //         this.x -= this.speed;
        //     } 
        //     else if (this.wasHit && World.chicken.energy > 0) {
        //         this.wasHitImageCounter = 0;
                
        //         //console.log("udaj wasHitImageCounter", this.wasHitImageCounter);
        //     }
        //     else if (this.isAlert) {
        //         this.speed = 0;
        //     }
        //     else if (World.chicken.energy <= 0) {
        //         this.chickenDead = true;
        //         //AudioHub.playSoundeffect(AudioHub.BOSSDEAD);
        //         //je to v movable object u get loss screen
        //     }
            
        // }, 1000 / 60);

        setInterval(() => {
            // Bewegungssteuerung
            if (!this.isAlert && !this.wasHit && !this.chickenDead) {
                this.speed = 0.1 + Math.random() * 0.5;
                this.x -= this.speed;
            } if (this.isAlert || this.chickenDead) {
                this.speed = 0; // Keine Bewegung in diesen Zuständen
            }          
            if (World.chicken.energy <= 0) {
                this.chickenDead = true;
            }

            // Die Logik für das Zurücksetzen von wasHitImageCounter gehört in den Animations-Interval
            // damit die Bewegung nicht sofort unterbrochen wird.
        }, 1000 / 60);
        // setInterval(() => {
        //     if (!this.isAlert && World.chicken.energy > 0 && !this.isAttacking && this.wasHitImageCounter > 0) {
        //         //pokud tam nebude !is.Attacking, slepice Pepeho i pri kolizi proste prejde
        //         this.hurtAnimationShown = false;
        //         this.wasHit = false;
        //         this.playAnimation(this.IMAGES_WALKING);
        //     }
        //     else if (this.wasHitImageCounter == 0 && this.wasHit){
        //         //musim to nekde zase dat na false
        //         console.log("wo bin ich?"); //tohle se ukazuje hned na zacatku hry
        //         this.playHurtAnimation(this.IMAGES_HURT);
        //     }
        //      else if (this.isAlert) {
        //         this.wasHit = false;
        //         this.playAnimation(this.IMAGES_ALERT);
        //     } else if (this.isAttacking) {
        //         this.playAnimation(this.IMAGES_ATTACK);
        //     } 
        //     else if (this.chickenDead) {
        //         this.wasHit = false;
        //         console.log("dead animation should be playing");
        //         this.playAnimation(this.IMAGES_DEAD);
        //     }
        // }, 350);
        setInterval(() => {
            // Animationssteuerung
            if (this.chickenDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.wasHit) {
                this.playHurtAnimation(this.IMAGES_HURT);
            } else if (this.isAlert) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 350);
    }

playHurtAnimation(hurtImages) {
if(!this.hurtAnimationShown) {
    this.wasHitImageCounter++;
    this.playAnimation(hurtImages);
    if(this.wasHitImageCounter == hurtImages.length + 1){
        this.wasHit = false;
        this.hurtAnimationShown = true;
        this.wasHitImageCounter = 0;
    }
}
}

}
