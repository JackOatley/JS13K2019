import * as game from "./game.js";
import * as splash from "./splash.js";
import * as keyboard from "././lib/keyboard.js";
import {nextPalette, currentPalette, toCSS, toGL} from "./palette.js";
import {ctxCanvas, ctx, gl,} from "./renderer.js";
import {TextureAtlas} from "././lib/texture_atlas.js";
import {Sprite} from "./sprite.js";
import {testMusic} from "./snd/testMusic.js";
import * as coil from "./lib/coil.js";

keyboard.init();
Sprite.init();
game.init(ctxCanvas.width, ctxCanvas.height);

var state = "splash";

setTimeout(() => {
	var music = testMusic.play();
	music.addEventListener("ended", function() {
		music.play();
	});
}, 1000);

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
	coil.update();
	if (coil.isSubscriber && keyboard.pressed("Q")) {
		nextPalette();
	}

	switch (state) {

		case ("splash"):
			if (keyboard.any("ARROWUP", "ARROWDOWN", "ARROWLEFT", "ARROWRIGHT")) {
				state = "game";
			}
			break;

		default:
			game.update(dt);
			break;

	}

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

	switch (state) {

		case ("splash"):
			splash.draw();
			break;

		default:
			game.draw();
			break;

	}

	Sprite.batchEnd();

}
