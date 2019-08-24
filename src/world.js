import * as DogeMath from "./dogemath.js";
import {currentPalette, toCSS} from "./palette.js";

var hills = [];
var width, height;
var maxDist = 100;
var midHeight = 50;
var low = false;
var lerpP = 0.0001;
/**
 *
 * @param {Number} _width
 * @param {Number} _height
 */
function init(_width, _height) {
	width = _width;
	height = _height;
}

/**
 * @param {Number} dt DeltaTime
 */
function update(dt) {
	if (hills.length == 0 || hills[hills.length - 1].x < width) {
		var nh = DogeMath.randomRange(midHeight + low ? -25 : 25, midHeight + low ? -75 : 75);
		addPoint(
			width + maxDist,
			nh
		);
	}
	hills.forEach(i => {
		i.x -= dt
	});

	while (hills[0].x < -lerpP) hills.shift();
}

function addPoint(x, y) {
	if (hills.length > 0) {
		var lastIndex = hills.length - 1;
		var last = hills[lastIndex];
		var midX = (last.x + x) / 2;
		var midY = (last.y + y) / 2;

		hills.push({
			x: midX,
			y: midY
		});

		lerpToPoint({
			x: midX,
			y: midY
		}, last, d => {
			hills.splice(lastIndex + 1, 0, d);
		});
		lerpToPoint({
			x: midX,
			y: midY
		}, {
			x: x,
			y: y
		}, d => {
			hills.push(d);
		});
	}

	hills.push({
		x: x,
		y: y
	});
}

function lerpToPoint(start, target, func) {
	while (DogeMath.getDistance(start, target) > lerpP) {
		func({
			x: start.x,
			y: start.y
		});
		// start.x = DogeMath.eastIn(1, start.x, target.x - start.x, 100);
		// start.y = DogeMath.eastIn(1, start.y, target.y - start.y, 50);
		start.x += DogeMath.lerp(start.x, target.x, 10);
		start.y += DogeMath.lerp(start.y, target.y, 5);
	}
}

/**
 *
 * @param {Object} ctx
 */
function draw(ctx) {
	ctx.fillStyle = toCSS(currentPalette[2]);
	ctx.strokeStyle = toCSS(currentPalette[0]);
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(hills[0].x, height);
	ctx.lineTo(hills[0].x, height / 2 - hills[0].y);
	hills.forEach(i => {
		ctx.lineTo(i.x, height / 2 - i.y);
	});
	ctx.lineTo(width, height);
	ctx.fill();
	ctx.stroke();
}

export {
	init,
	update,
	draw
}
