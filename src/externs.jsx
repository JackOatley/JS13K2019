/**
 * My type constructor - I will be called with the new keyword
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
 * @typedef {{vertex: string, fragment: string}}
 */
var ShaderSource;
