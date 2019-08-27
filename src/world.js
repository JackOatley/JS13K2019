import {any} from "../lib/keyboard.js";
import * as DogeMath from "./dogemath.js";
import {currentPalette, toCSS} from "./palette.js";
import {camera} from "./camera.js";

var drawDebug = false;

var hills = [];
var hillWidth;
var midPoints;
var width = 0,
	height = 0;
var x = 0, y = 0;

var minHillDist = 10;
var maxHillDist = 15;

var minHillDiff = 10;
var maxHillDiff = 50;

var timeSteps = 10;
/**
 *
 * @param {number} _width
 * @param {number} _height
 * @param {number}	numberOfHills
 * @return {Object} World metrics.
 */
function init(_width, _height, numberOfHills) {
	width = _width;
	height = _height;
	return generateWorld(numberOfHills || 20);
}

function generateWorld(num) {
	var last = {
		x: 0,
		y: 0
	};
	addPoint(0, 0);
	var low = true;
	while (num--) {
		last.x += ~~DogeMath.randomRange(minHillDist, maxHillDist) * 10;
		last.y = DogeMath.randomRange(
			(low ? -minHillDiff : minHillDiff),
			(low ? -maxHillDiff : maxHillDiff));
		addPoint(last.x, last.y);
		low = !low;
	}
	addPoint(last.x + maxHillDist * 10, 0);
	hillWidth = hills[hills.length - 1].x;
	midPoints = ~~(hills.length / 10);
	console.log(midPoints);
	return {
		width: hillWidth
	}
}

/**
 * @param {number} dt DeltaTime
 */
function update(dt) {

	// Test camera stuff!
	if (any("ARROWLEFT")) {
		camera.toX -= 5;
	}
	if (any("ARROWRIGHT")) {
		camera.toX += 5;
	}

	//if (x <= -hillWidth) x = 0;

	x = -camera.x;
	y = -camera.y;

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
	var curr, next, nx, n = 0, loop = -1;
	curr = hills[0];
	while (curr) {
		curr = hills[n];
		if (n === hills.length - 1) {
			next = hills[0];
			nx = curr.x;
		} else {
			next = hills[n + 1];
			nx = next.x;
		}

		// Build triangle.
		ctx.moveTo(curr.x + x + (loop * hillWidth), height + y);
		ctx.lineTo(curr.x + x + (loop * hillWidth), height / 2 - curr.y + y);
		ctx.lineTo(nx + x + (loop * hillWidth), height / 2 - next.y + y);
		ctx.lineTo(nx + x + (loop * hillWidth), height + y);

		if (nx + x + (loop * hillWidth) > width) {
			break;
		}

		// Loop around to start, but keep relative drawing position.
		n += 1;
		if (n >= hills.length) {
			n = 0;
			loop += 1;
		}

	}
	ctx.fill();

	// Draw outline.
	ctx.strokeStyle = toCSS(currentPalette[0]);
	ctx.lineWidth = 2;
	ctx.beginPath();
	// var i, next, nx;
	// for (var n = 0; n < hills.length; n++) {
	// 	i = hills[n];
	// 	if (n === hills.length - 1) {
	// 		next = hills[0];
	// 		nx = i.x + 100; // Need a way to get this number.
	// 	} else {
	// 		next = hills[n + 1];
	// 		nx = next.x;
	// 	}
	// 	//ctx.moveTo(i.x + x, height);
	// 	ctx.moveTo(i.x + x, height / 2 - i.y);
	// 	ctx.lineTo(nx + x, height / 2 - next.y);
	// 	//ctx.lineTo(nx + x, height);
	// }
	var i = 0;
	var next = hills[i];
	var dir = 1;
	var loop = -1;
	ctx.moveTo(next.x + x + (loop * hillWidth), height / 2 - next.y + y);
	i++;
	while (next !== undefined) {
		var nx = next.x + x + (loop * hillWidth);
		if (nx > width) break;
		ctx.lineTo(nx, height / 2 - next.y + y);
		i++;
		if (i >= hills.length) {
			i = 0;
			loop++;
		}
		next = hills[i];
	}

	ctx.stroke();

	// Draw debug.
	if (drawDebug) {
		ctx.beginPath();
		ctx.moveTo(hills[0].x + x, height + y);
		ctx.lineTo(hills[0].x + x, 270 + y);
		hills.forEach(i => {
			ctx.moveTo(i.x + x, height / 2 - i.y - (i.c ? 10 : 0) + y);
			ctx.lineTo(i.x + x, 270 + y);
		});
		ctx.lineWidth = 0.5;
		ctx.strokeStyle = "rgb(0,0,0,100)";
		ctx.stroke();

		var i = findIndex(150);
		if (i >= 0) {
			ctx.beginPath();
			ctx.moveTo(hills[i].x + x, height / 2 - hills[i].y + y);
			ctx.lineTo(hills[i].x + x, 270 + y);

			ctx.lineWidth = 0.5;
			ctx.strokeStyle = "rgb(255,0,0,100)";
			ctx.stroke();
		}
	}

}

/**
 * Finds the index of the closest Segment to the specified posX value
 * @param {number} posX
 */
function findIndex(posX) {
	//approximate position.
	var nx = posX - x;
	var approx = ~~(nx / (hillWidth / midPoints)) * 10;
	//step until you hit the closest point.
	while (hills[approx] !== undefined && hills[approx].x > nx) approx--;
	while (hills[approx] !== undefined && hills[approx].x < nx) approx++;
	if (hills[approx] === undefined) return -1;
	return approx;
}

function getHill(index) {
	return {
		x: hills[index].x,
		y: hills[index].y
	};
}

function getAngle(index) {
	var hill = hills[index];
	var nextHill = hills[index + 1];
	if (hill === undefined || nextHill === undefined) return 0;
	return DogeMath.getAngle(hill, nextHill);
}

/**
 * 100% British engineering!!
 */
function JacksAwesomeHillPos(px) {
	var i = findIndex(px);
	var a = getHill(i - 1);
	var b = getHill(i);
	var v = ((px - x) - a.x) / (b.x - a.x);
	return [
		a.y + (b.y - a.y) * v,
		DogeMath.getAngle(a, b)
	]
}

export {
	init,
	update,
	draw,
	findIndex,
	getHill,
	getAngle,
	JacksAwesomeHillPos
}
