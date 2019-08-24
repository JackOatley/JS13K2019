import * as game from "./game.js";
import * as world from "./world.js";
import {currentPalette, toCSS} from "./palette.js";

const Canvas = document.getElementById("c");
Canvas.width = 480;
Canvas.height = 270;
const ctx = Canvas.getContext("2d", {
	alpha: false
});

world.init(Canvas.width, Canvas.height);

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
	ctx.fillRect(0, 0, Canvas.width, Canvas.height);
	world.draw(ctx);
}
