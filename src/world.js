import * as DogeMath from "./dogemath.js";
import {
	currentPalette,
	toCSS
} from "./palette.js";

var hills = [];
var width, height;
var x = 0;

var minHillDist = 100;
var maxHillDist = 150;

var minHillDiff = 10;
var maxHillDiff = 50;

var timeSteps = 10;
/**
 *
 * @param {Number} _width
 * @param {Number} _height
 * @param {Number}	numberOfHills
 */
function init(_width, _height, numberOfHills) {
	width = _width;
	height = _height;
	generateWorld(numberOfHills || 20);
}

function generateWorld(num) {
	var last = {
		x: -maxHillDist,
		y: 0
	};
	var low = true;
	while (num--) {
		last.x = last.x + DogeMath.randomRange(minHillDist, maxHillDist);
		last.y = DogeMath.randomRange(
			(low ? -minHillDiff : minHillDiff),
			(low ? -maxHillDiff : maxHillDiff));
		addPoint(last.x, last.y);
		low = !low;
	}
}

/**
 * @param {Number} dt DeltaTime
 */
function update(dt) {
	x -= dt;
	if (x <= -timeSteps * hills.length) x = 0;
}

function addPoint(x, y) {
	if (hills.length > 0) {
		var lastIndex = hills.length - 1;
		var last = hills[lastIndex];
		var midX = (last.x + x) / 2;
		var midY = (last.y + y) / 2;

		hills.push({
			x: midX,
			y: midY,
			c: true // only for debug, dont forget to remove
		});

		//Lerp left from Mid point
		lerpToPoint({
			x: midX,
			y: midY
		}, last, d => hills.splice(lastIndex + 1, 0, d));

		//Kerp right from Mid point
		lerpToPoint({
			x: midX,
			y: midY
		}, {
			x: x,
			y: y
		}, d => hills.push(d));

	}

	hills.push({
		x: x,
		y: y,
		c: true // only for debug, dont forget to remove
	});
}

function lerpToPoint(start, target, func) {
	const timeStep = 1 / timeSteps;
	const step = {
		x: start.x,
		y: start.y
	};
	for (var i = timeStep; i < 1 - timeStep; i += timeStep) {
		step.x = DogeMath.lerp(start.x, target.x, i);
		step.y = DogeMath.easeIn(start.y, target.y - start.y, i, 1);
		func({
			x: step.x,
			y: step.y
		});
	}
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function draw(ctx) {

	// Draw fill.
	ctx.fillStyle = toCSS(currentPalette[2]);
	ctx.beginPath();
	ctx.moveTo(0, height);
	hills.forEach(i => {
		if (i.x + x < -timeSteps || i.x + x > width) return;
		ctx.lineTo(i.x + x, height / 2 - i.y);
	});
	ctx.lineTo(width + x, height);
	ctx.fill();

	// Draw outline.
	ctx.strokeStyle = toCSS(currentPalette[0]);
	ctx.lineWidth = 2;
	ctx.stroke();

	// Draw debug.
	ctx.beginPath();
	ctx.moveTo(hills[0].x, height);
	ctx.lineTo(hills[0].x, 270);
	hills.forEach(i => {
		ctx.moveTo(i.x, height / 2 - i.y - (i.c ? 10 : 0));
		ctx.lineTo(i.x, 270);
	});
	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "rgb(0,0,0,100)";
	//ctx.stroke();

}

export {
	init,
	update,
	draw
}