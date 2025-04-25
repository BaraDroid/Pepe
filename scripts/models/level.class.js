class Level {
    //#####################################################
    //################ attributes ##########################
    //#####################################################

    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;
    coins;

    //################ static ##########################
    static level_end_x = 2250; //I can reaach it in every class

    //#####################################################
    //################ constructor ##########################
    //#####################################################
    constructor(enemies, clouds, backgroundObjects, collectableObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.coins = coins;
    }
}
