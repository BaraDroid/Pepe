let cloudX = Math.random()*700;
let level1;

function clearLevel() {
  level1 = "";
}

function initLevel() {
  level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
         new Endboss(),
        new Babychicken(),
        new Babychicken()
    ],
    [new Cloud('img_pollo_locco/img/5_background/layers/4_clouds/1.png', cloudX, 0),
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