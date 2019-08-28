import * as game from "./game.js";
import * as keyboard from "././lib/keyboard.js";
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
} from "././lib/texture_atlas.js";
import {
	Sprite
} from "./sprite.js";

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
	game.draw(ctx);
	Sprite.batchEnd();

}
