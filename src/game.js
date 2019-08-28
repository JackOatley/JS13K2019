import * as world from "./world.js";
import { createItem, drawItems } from "./item.js";
import { spriteRobinHorizontal } from "./sprites/robin_horizontal.js";
import { spriteRobinVertical } from "./sprites/robin_vertical.js";
import { spriteTree1 } from "./sprites/tree_1.js";
import { spriteHouse } from "./sprites/house.js";
import { currentPalette } from "./palette.js";
import { camera } from "./camera.js";
import { worldMatrix } from "./renderer.js";
import * as player from "./player.js";

// Setup a main camera.
camera.moveTo(240, 135);

var width = 0,
	height = 0;

function init(_width, _height) {
	width = _width;
	height = _height;

	var metrics = world.init(width, height, 20);
	player.init(_width, _height);

	for (var n = 20; n < metrics.width; n += 5) {
		createItem(spriteTree1, n, 1, 0.3 + Math.random() * 0.2);
	}

	for (var n = 20; n < metrics.width; n += 20) {
		createItem(spriteTree1, n, 2, 0.4 + Math.random() * 0.4);
	}

	for (var n = 20; n < metrics.width; n += 50) {
		createItem(spriteTree1, n, 3, 0.75 + Math.random() * 0.25);
	}

}

/**
 * @param {number} dt
 */
function update(dt) {

	camera.update();
	world.update(dt);
	player.update(dt);
}

function draw(ctx) {

	worldMatrix.save();
	worldMatrix.translate(-camera.x, -camera.y, 0);


	spriteRobinHorizontal.draw(0, 50, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteRobinVertical.draw(0, 100, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteTree1.draw(0, 150, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteHouse.draw(0, 200, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);

	world.draw(ctx);
	drawItems();
	player.draw(ctx);
	worldMatrix.restore();

}

export {
	init,
	update,
	draw
}
