import * as world from "./world.js";
import * as player from "./player.js";
import {createItem, drawItems} from "./item.js";
import * as sprites from "./sprites/sprite_list.js";
import {currentPalette} from "./palette.js";
import {camera} from "./camera.js";
import {ctxCanvas, worldMatrix} from "./renderer.js";

// Setup a main camera.
camera.moveTo(240, 135);

const clouds = [];
var width = 0,
	height = 0;

function init(_width, _height) {
	width = _width;
	height = _height;

	var metrics = world.init(width, height, 11);
	player.init(_width, _height);

	//
	createClouds();

	// Trees.
	for (var n = 20; n < metrics.width; n += 5) {
		createItem(sprites.spriteTree1, n, -1, 1, 0.3 + Math.random() * 0.2);
	}

	for (var n = 20; n < metrics.width; n += 20) {
		createItem(sprites.spriteTree1, n, -1, 2, 0.4 + Math.random() * 0.4);
	}

	for (var n = 20; n < metrics.width; n += 50) {
		createItem(sprites.spriteTree1, n, -1, 3, 0.75 + Math.random() * 0.25);
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
	sprites.sprite_sun.draw(0, 300, 80, 1, 1, 0, currentPalette[2]);
	drawClouds();

	// Draw clouds.

	// Setup camera.
	worldMatrix.save();
	worldMatrix.translate(-camera.x, -camera.y, 0);

	// Draw game items.
	sprites.spriteRobinHorizontal.draw(0, 50, 50, 1, 1, performance.now() / 200, currentPalette[3]);
	sprites.spriteRobinVertical.draw(0, 100, 50, 1, 1, performance.now() / 200, currentPalette[3]);
	sprites.spriteTree1.draw(0, 150, 50, 1, 1, performance.now() / 200, currentPalette[3]);
	sprites.spriteHouse.draw(0, 200, 50, 1, 1, performance.now() / 200, currentPalette[3]);

	drawItems();
	world.draw();
	player.draw();

	// Restore matrix, and draw the GUI.
	worldMatrix.restore();
	drawGui();

}

/**
 * Draws the GUI, duh!
 * @return {void}
 */
function drawGui() {

	// Cache colors.
	const c1 = currentPalette[3];
	const c2 = currentPalette[0];

	// Boost bar.
	sprites.spriteBoostBar.draw(0, 4, 4, 1, 1, 0, c1);
	var fill = 6; // Replace this with actual boost value, out of 10.
	for (var n = 0; n < 10; n++) {
		var c = (n < fill) ? 0 : 3;
		sprites.spriteBoostPip.draw(0, 8 + n * 12, 8, 1, 1, 0, currentPalette[c]);
	}

	// Boost text.
	var center = sprites.font.textLength("BOOST") / 2;
	sprites.font.drawTextShadowed("BOOST", 66-center, 40, c1, c2);

	// Gold text.
	var txt = "00,000,000";
	center = sprites.font.textLength(txt) / 2;
	sprites.font.drawTextShadowed(txt, ctxCanvas.width-66-center, 10, c1, c2);

	// Gold text.
	center = sprites.font.textLength("GOLD") / 2;
	sprites.font.drawTextShadowed("GOLD", ctxCanvas.width-66-center, 40, c1, c2);

	//sprites.spriteTree1.draw(0, 150, 50, 1, 1, 0, [...currentPalette[3], 255]);

}

/**
 * @return {void}
 */
function createClouds() {
	for (var n = 20; n < 1000; n += 100) {
		var i = ~~(Math.random() * sprites.cloudsArray.length);
		var y = -10 + Math.random() * 250;
		var layer = (n < 500) ? 1 : 2;
		clouds.push({
			sprite: sprites.cloudsArray[i],
			x: n,
			y: y,
			layer: layer,
			color: layer
		});
	}
}

/**
 * @return {void}
 */
function drawClouds() {
	clouds.forEach(cloud => {
		var color = currentPalette[cloud.color];
		var scale = (cloud.layer === 2) ? 1 : 0.8;
		cloud.x -= cloud.layer;
		while (cloud.x < -cloud.sprite.width) {
			cloud.x += ctxCanvas.width + cloud.sprite.width * 2;
		}
		cloud.sprite.draw(0, cloud.x, cloud.y, scale, scale, 0, color);
	});
}

export {
	init,
	update,
	draw
}
