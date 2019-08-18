import "./game.js";
const Canvas = document.getElementById("c");
Canvas.width = 480;
Canvas.height = 270;
const ctx = Canvas.getContext("2d", {
	alpha: false
});


var tickInterval = 1000 / 64;
var sendTick = 0;
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
var posX = 0

function update(dt) {
	posX += 1 * dt;
}

function render() {
	ctx.clearRect(0, 0, Canvas.width, Canvas.height);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(posX, 100, 20, 20);
}