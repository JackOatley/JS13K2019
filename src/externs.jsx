/**
 * @constructor
 * @param {Image|HTMLCanvasElement} img
 * @param {number} xOffset
 * @param {number} yOffset
 */
function Sprite(img, xOffset, yOffset) {};
Sprite.prototype.width = 0;
Sprite.prototype.height = 0;
Sprite.prototype.frames = [];

/**
 * @constructor
 * @extends Sprite
 */
function SpriteBase64(img, xOffset, yOffset) {};

/**
 * @typedef {{vertex: string, fragment: string}}
 */
var ShaderSource;
