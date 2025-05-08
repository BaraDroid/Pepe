/**
 * Represents a game level with its associated elements.
 */
class Level {
    /**
     * An array containing the enemies present in the level.
     * @type {Array}
     */
    enemies;

    /**
     * An array containing the clouds in the level's background.
     * @type {Array}
     */
    clouds;

    /**
     * An array containing the static background objects of the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * An array containing objects that the player can collect.
     * @type {Array}
     */
    collectableObjects;

    /**
     * An array containing the coins in the level.
     * @type {Array}
     */
    coins;

    /**
     * The static x-coordinate marking the end of the level. Accessible in every class.
     * @type {number}
     */
    static level_end_x = 2250;

    /**
     * Creates a new Level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level's background.
     * @param {Array} backgroundObjects - The static background objects of the level.
     * @param {Array} collectableObjects - The objects the player can collect.
     * @param {Array} coins - The coins in the level.
     */
    constructor(enemies, clouds, backgroundObjects, collectableObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.coins = coins;
    }
}