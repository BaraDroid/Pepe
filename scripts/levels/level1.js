/**
 * @file Defines the logic for Level 1 of the game, including enemy and background object instantiation.
 */

/**
 * Initial horizontal position for clouds, randomized on page load.
 * @type {number}
 */
let cloudX = Math.random() * 700;

/**
 * Represents the current level 1 instance.
 * @type {Level|string}
 */
let level1;

/**
 * Clears the current level data.
 * @function clearLevel
 */
function clearLevel() {
  level1 = "";
}

/**
 * Initializes Level 1 by creating instances of enemies, clouds, background objects, and collectable items.
 * @function initLevel
 */
function initLevel() {
  console.log("neues level initialisiert");
  level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
         new Endboss(),
        new Babychicken(),
        new Babychicken()
    ],
    [
        new Cloud('img_pollo_locco/img/5_background/layers/4_clouds/1.png', cloudX, 0),
        new Cloud('img_pollo_locco/img/5_background/layers/4_clouds/2.png',cloudX + 720, 0 ),
        new Cloud('img_pollo_locco/img/5_background/layers/4_clouds/1.png',cloudX + (2 * 720), 0 ),
        new Cloud('img_pollo_locco/img/5_background/layers/4_clouds/2.png',cloudX + (3 * 720), 0 ),
        new Cloud('img_pollo_locco/img/5_background/layers/4_clouds/1.png',cloudX + (4 * 720), 0 ),
        new Cloud('img_pollo_locco/img/5_background/layers/4_clouds/2.png',cloudX + (5 * 720), 0 ),
    ],
    [
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', -719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', -719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', -719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', -719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', -719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719,0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719, 0),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719,0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719, 0),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719*2, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719*3, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719*3,0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719*3, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719*3, 0)
      ],
      [
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
        new CollectableObject(),
      ],
      [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
      ]
  );
}