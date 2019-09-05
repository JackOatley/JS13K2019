import * as world from "./world.js";
import * as player from "./player.js";
import {createItem, destroyItem, drawItems} from "./item.js";
import * as sprites from "./sprites/sprite_list.js";
import {currentPalette} from "./palette.js";
import {camera} from "./camera.js";
import {ctxCanvas, worldMatrix} from "./renderer.js";
import {coinsfx} from "./snd/coinsfx.js";
import * as math from "./dogemath.js";
import {removeFromArray, numberWithCommas} from "./lib/utils.js";

// Setup a main camera.
camera.moveTo(240, 135);

const clouds = [];
const coins = [];

/**
 *
 */
function init(width, height) {

	world.init(width, height, 11);
	player.init(width, height);

	//
	createClouds();
	createTrees();
	createNottingham();

	//
	function coinDrawing(x, y) {
		var scale = Math.cos(x + performance.now() / 100);
		sprites.sprite_sun.draw(0, x, y, scale*0.1, 0.1, 0, currentPalette[3]);
		sprites.coin.draw(0, x, y, scale*1, 1, 0, currentPalette[0]);
	}

	// Coins test.
	for (var n=0; n<10; n+=1) {
		var coin = createItem(coinDrawing, 400+n*24, -1, 3, 1);
		coin.y -= 20;
		coins.push(coin);
	}

}

/**
 * @param {number} dt
 */
function update(dt) {

	camera.update();
	world.update(dt);
	player.update(dt);

	coins.forEach((c) => {
		if (math.getDistance(player.x, player.y, c.x, c.y) < 30) {
			destroyItem(c);
			removeFromArray(c, coins);
			coinsfx.play();
			player.addGold(1);
		}
	});

}

function draw(ctx) {

	// Draw the background (sun), before camera is applied to worldMatrix.
	sprites.sprite_sun.draw(0, 300, 80, 1, 1, 0, currentPalette[2]);
	drawClouds();

	// Setup camera.
	worldMatrix.save();
	worldMatrix.scale(1/camera.zoom, 1/camera.zoom, 1);
	worldMatrix.translate(-camera.x, -camera.y, 0);

	//
	const c1 = currentPalette[2];
	const c2 = currentPalette[0];
	var center = sprites.font.textLength("Nottingham") / 2;
	var [y] = world.JacksAwesomeHillPos(140-center, -1);
	sprites.font.drawTextShadowed("Nottingham", 140-center, y-120, c1, c2);
	sprites.font.drawTextShadowed("Nottingham", 140-center+world.hillWidth, y-120, c1, c2);

	// Draw game.
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
	for (var n = 0; n < 10; n++) {
		var c = (n < Math.ceil(player.energy)) ? 0 : 3;
		sprites.spriteBoostPip.draw(0, 8 + n * 12, 8, 1, 1, 0, currentPalette[c]);
	}

	// Boost text.
	var center = sprites.font.textLength("ENERGY") / 2;
	sprites.font.drawTextShadowed("ENERGY", 66-center, 40, c1, c2);

	// Gold text.
	//var txt = "00,000,000";
	var txt = numberWithCommas(100000000 + player.gold).slice(1);
	center = sprites.font.textLength(txt) / 2;
	sprites.font.drawTextShadowed(txt, ctxCanvas.width-66-center, 10, c1, c2);

	// Gold text.
	center = sprites.font.textLength("GOLD") / 2;
	sprites.font.drawTextShadowed("GOLD", ctxCanvas.width-66-center, 40, c1, c2);

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

/**
 *
 */
function createTrees() {
	for (var n = 20; n < world.metrics.width; n += 5) {
		n += Math.random() * 20;
		createItem(sprites.spriteTree1, n, -1, 1, 0.3 + Math.random() * 0.2);
	}
	for (var n = 20; n < world.metrics.width; n += 10) {
		n += Math.random() * 40;
		createItem(sprites.spriteTree1, n, -1, 2, 0.4 + Math.random() * 0.4);
	}
	for (var n = 20; n < world.metrics.width; n += 20) {
		n += Math.random() * 160;
		createItem(sprites.spriteTree1, n, -1, 3, 0.75 + Math.random() * 0.25);
	}
}

/**
 *
 */
function createNottingham() {
	for (var n = 0; n < 240; n += 10) {
		n += Math.random() * 5;
		var spr = Math.round(Math.random()) ? sprites.spriteHouse: sprites.tower;
		createItem(spr, n, -1, 0, 0.4 + Math.random() * 0.6);
	}
	for (var n = 20; n < 220; n += 12) {
		n += Math.random() * 10;
		var spr = Math.round(Math.random()*2) ? sprites.spriteHouse: sprites.tower;
		createItem(spr, n, -1, 2, 0.6 + Math.random() * 0.4);
	}
	for (var n = 40; n < 200; n += 14) {
		n += Math.random() * 20;
		var spr = Math.round(Math.random()*3) ? sprites.spriteHouse : sprites.tower;
		createItem(spr, n, -1, 3, 0.8 + Math.random() * 0.2);
	}
}

export {
	init,
	update,
	draw
}
