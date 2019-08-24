import * as game from "./game.js";
import * as world from "./world.js";
import {currentPalette, toCSS} from "./palette.js";
import {ctxCanvas, ctx} from "./renderer.js";

world.init(ctxCanvas.width, ctxCanvas.height);

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
	world.update(dt);
	game.update(dt);
}

function render() {
	ctx.fillStyle = toCSS(currentPalette[1]);
	ctx.fillRect(0, 0, ctxCanvas.width, ctxCanvas.height);
	world.draw(ctx);
}
