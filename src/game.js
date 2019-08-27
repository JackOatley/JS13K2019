import * as world from "./world.js";
import {
	spriteRobinHorizontal
} from "./sprites/robin_horizontal.js";

var width = 0,
	height = 0,
	currentPalette;

function init(_width, _height, _currentPalette) {
	width = _width;
	height = _height;
	currentPalette = _currentPalette;

	world.init(width, height, 20);
}

/**
 * @param {number} dt
 */
function update(dt) {
	world.update(dt);
}

function draw(ctx) {
	var index = world.findIndex(150);
	var hill = world.getHill(index);

	var [h, a] = world.JacksAwesomeHillPos(150);

	spriteRobinHorizontal.draw(0, 150, height / 2 - h - 10, 1, 1, 3.14 - a, [...currentPalette[3], 255]);
	world.draw(ctx);
}

export {
	init,
	update,
	draw
}
