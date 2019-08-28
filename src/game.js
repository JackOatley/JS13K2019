import * as world from "./world.js";
import {createItem, drawItems} from "./item.js";
import {spriteRobinHorizontal} from "./sprites/robin_horizontal.js";
import {spriteRobinVertical} from "./sprites/robin_vertical.js";
import {spriteTree1} from "./sprites/tree_1.js";
import {spriteHouse} from "./sprites/house.js";
import {spriteBoostBar} from "./sprites/boost_bar.js";
import {spriteBoostPip} from "./sprites/boost_pip.js";
import * as sprites from "./sprites/sprite_list.js";
import {currentPalette} from "./palette.js";
import {camera} from "./camera.js";
import {worldMatrix} from "./renderer.js";
import {Sprite} from "./sprite.js";

// Setup a main camera.
camera.moveTo(240, 135);

var width = 0,
	height = 0;

function init(_width, _height) {
	width = _width;
	height = _height;

	var metrics = world.init(width, height, 20);

	for (var n=20; n<metrics.width; n+=5) {
		createItem(spriteTree1, n, 1, 0.3 + Math.random() * 0.2);
	}

	for (var n=20; n<metrics.width; n+=20) {
		createItem(spriteTree1, n, 2, 0.4 + Math.random() * 0.4);
	}

	for (var n=20; n<metrics.width; n+=50) {
		createItem(spriteTree1, n, 3, 0.75 + Math.random() * 0.25);
	}

}

/**
 * @param {number} dt
 */
function update(dt) {
	camera.update();
	world.update(dt);
}

function draw(ctx) {

	// Draw the background (sun), before camera is applied to worldMatrix.
	sprites.sprite_sun.draw(0, 300, 80, 1, 1, 0, [...currentPalette[2], 255]);

	// Setup camera.
	worldMatrix.save();
	worldMatrix.translate(-camera.x, -camera.y, 0);

	// Draw game items.
	spriteRobinHorizontal.draw(0, 50, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteRobinVertical.draw(0, 100, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteTree1.draw(0, 150, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteHouse.draw(0, 200, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);

	world.draw(ctx);
	drawItems();
	// Draw player.
	var index = world.findIndex(150);
	var hill = world.getHill(index);
	var [h, a] = world.JacksAwesomeHillPos(50);
	camera.toY = -h + 75;
	spriteRobinHorizontal.draw(0, 50+camera.x, height / 2 - h - 10, 1, 1, 3.14 - a, [...currentPalette[3], 255]);

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
	spriteBoostBar.draw(0, 4, 4, 1, 1, 0, [...currentPalette[3], 255]);
	var fill = 6; // Replace this with actual boost value, out of 10.
	for (var n = 0; n < 10; n++) {
		var c = (n < fill) ? 0 : 3;
		spriteBoostPip.draw(0, 8 + n * 12, 8, 1, 1, 0, [...currentPalette[c], 255]);
	}

}

export {
	init,
	update,
	draw
}
