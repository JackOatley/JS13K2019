import * as world from "./world.js";
import {createItem, drawItems} from "./item.js";
import {spriteRobinHorizontal} from "./sprites/robin_horizontal.js";
import {spriteTree1} from "./sprites/tree_1.js";
import {currentPalette} from "./palette.js";

var width = 0,
	height = 0;

function init(_width, _height) {
	width = _width;
	height = _height;

	world.init(width, height, 20);

	for (var n=20; n<600; n+=5) {
		createItem(spriteTree1, n, 1, 0.3 + Math.random() * 0.3);
	}

	for (var n=20; n<600; n+=20) {
		createItem(spriteTree1, n, 2, 0.4 + Math.random() * 0.4);
	}

	for (var n=20; n<600; n+=50) {
		createItem(spriteTree1, n, 3, 0.75 + Math.random() * 0.25);
	}

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
	drawItems();
}

export {
	init,
	update,
	draw
}
