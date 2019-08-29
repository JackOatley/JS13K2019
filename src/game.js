import * as world from "./world.js";
import * as player from "./player.js";
import { createItem, drawItems } from "./item.js";
import * as sprites from "./sprites/sprite_list.js";
import { currentPalette } from "./palette.js";
import { camera } from "./camera.js";
import { worldMatrix } from "./renderer.js";

// Setup a main camera.
camera.moveTo(240, 135);

var width = 0,
	height = 0;

function init(_width, _height) {
	width = _width;
	height = _height;

	var metrics = world.init(width, height, 11);
	player.init(_width, _height);

	for (var n = 20; n < metrics.width; n += 5) {
		createItem(sprites.spriteTree1, n, 1, 0.3 + Math.random() * 0.2);
	}

	for (var n = 20; n < metrics.width; n += 20) {
		createItem(sprites.spriteTree1, n, 2, 0.4 + Math.random() * 0.4);
	}

	for (var n = 20; n < metrics.width; n += 50) {
		createItem(sprites.spriteTree1, n, 3, 0.75 + Math.random() * 0.25);
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

	// Draw the background (sun), before camera is applied to worldMatrix.
	sprites.sprite_sun.draw(0, 300, 80, 1, 1, 0, [...currentPalette[2], 255]);

	// Setup camera.
	worldMatrix.save();
	worldMatrix.translate(-camera.x, -camera.y, 0);

	// Draw game items.
	sprites.spriteRobinHorizontal.draw(0, 50, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	sprites.spriteRobinVertical.draw(0, 100, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	sprites.spriteTree1.draw(0, 150, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	sprites.spriteHouse.draw(0, 200, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);

	world.draw(ctx);
	drawItems();
	player.draw(ctx);
	// Restore matrix, and draw the GUI.
	worldMatrix.restore();
	drawGui();

}

/**
 * Draws the GUI, duh!
 * @return {void}
 */
function drawGui() {

	// Boost bar.
	sprites.spriteBoostBar.draw(0, 4, 4, 1, 1, 0, [...currentPalette[3], 255]);
	var fill = 6; // Replace this with actual boost value, out of 10.
	for (var n = 0; n < 10; n++) {
		var c = (n < fill) ? 0 : 3;
		sprites.spriteBoostPip.draw(0, 8 + n * 12, 8, 1, 1, 0, [...currentPalette[c], 255]);
	}

}

export {
	init,
	update,
	draw
}
