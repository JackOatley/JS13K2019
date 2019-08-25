import * as game from "./game.js";
import * as world from "./world.js";
import {currentPalette, toCSS, toGL} from "./palette.js";
import {ctxCanvas, ctx, gl} from "./renderer.js";
import {TextureAtlas} from "./texture_atlas.js";
import {Sprite} from "./sprite.js";
import {sprite_sun} from "./sprites/sprite_sun.js";

Sprite.init();
world.init(ctxCanvas.width, ctxCanvas.height, 5);

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

	world.update(dt);
	game.update(dt);
}

function render() {

	// Clear GL canvas. Typical background color.
	gl.clearColor(...toGL(currentPalette[1]), 1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Clear GUI canvas. Typical alpha=0.
	ctx.clearRect(0, 0, ctxCanvas.width, ctxCanvas.height);

	// Actually draw stuff!
	Sprite.batchStart();
	sprite_sun.draw(0, 300, 80, 1, 1, [...currentPalette[2], 255]);
	world.draw(ctx);
	Sprite.batchEnd();

}
