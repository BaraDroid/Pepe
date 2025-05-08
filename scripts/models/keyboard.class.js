/**
 * @class Represents the state of various keyboard keys relevant to the game.
 * This class holds boolean flags indicating whether specific keys are currently considered pressed or active.
 */
class Keyboard {
    /**
     * Indicates if the LEFT arrow key or a corresponding key (e.g., 'A') is active.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates if the RIGHT arrow key or a corresponding key (e.g., 'D') is active.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates if the UP arrow key or a corresponding key (e.g., 'W') is active.
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates if the DOWN arrow key or a corresponding key (e.g., 'S') is active.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates if the SPACE bar is active.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates if the 'D' key is active, typically used for a specific game action.
     * @type {boolean}
     */
    D = false;
}