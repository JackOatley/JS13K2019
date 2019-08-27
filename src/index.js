import * as game from "./game.js";
import * as keyboard from "./keyboard.js";
import {
	nextPalette,
	currentPalette,
	toCSS,
	toGL
} from "./palette.js";
import {
	ctxCanvas,
	ctx,
	gl,
	worldMatrix
} from "./renderer.js";
import {
	TextureAtlas
} from "./texture_atlas.js";
import {
	Sprite
} from "./sprite.js";
import {
	sprite_sun
} from "./sprites/sprite_sun.js";
import {
	spriteRobinHorizontal
} from "./sprites/robin_horizontal.js";
import {
	spriteRobinVertical
} from "./sprites/robin_vertical.js";
import {
	spriteTree1
} from "./sprites/tree_1.js";
import {
	spriteHouse
} from "./sprites/house.js";
import {
	spriteBoostBar
} from "./sprites/boost_bar.js";
import {
	spriteBoostPip
} from "./sprites/boost_pip.js";

keyboard.init();
Sprite.init();
game.init(ctxCanvas.width, ctxCanvas.height, currentPalette);

var tickInterval = 1000 / 60;
var lastTick = performance.now();
tick(lastTick);

function tick(now) {
	requestAnimationFrame(tick);
	var dt = now - lastTick;
	if (dt > tickInterval) {
		update(dt / 10);
		render();
		lastTick = now;
	}
}

function update(dt) {

	// Dt safety. If dt is too big, skip execution.
	if (dt > 10) {
		return;
	}

	// Palette swapping.
	if (keyboard.pressed("Q")) {
		nextPalette();
	}

	game.update(dt);
	keyboard.update();

}

function render() {

	// Clear GL canvas. Typical background color.
	gl.clearColor(...toGL(currentPalette[1]), 1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Clear GUI canvas. Typical alpha=0.
	ctx.clearRect(0, 0, ctxCanvas.width, ctxCanvas.height);

	// Actually draw stuff!
	Sprite.batchStart();
	sprite_sun.draw(0, 300, 80, 1, 1, 0, [...currentPalette[2], 255]);
	spriteRobinHorizontal.draw(0, 50, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteRobinVertical.draw(0, 100, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteTree1.draw(0, 150, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	spriteHouse.draw(0, 200, 50, 1, 1, performance.now() / 200, [...currentPalette[3], 255]);
	game.draw(ctx);
	drawGui();
	Sprite.batchEnd();

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