import * as DogeMath from "./dogemath.js";
import { currentPalette, toCSS } from "./palette.js";
import { camera } from "./camera.js";
import { Sprite } from "./sprite.js";

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
	//x = -camera.x;
	//y = -camera.y;
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
	var curr, next, nx, n = findIndex(-camera.x), loop = -1;
	curr = hills[n];
	while (curr) {
		curr = hills[n];
		if (n === hills.length - 1) {
			next = findIndex(-camera.x);
			nx = curr.x;
		} else {
			next = hills[n + 1];
			nx = next.x;
		}

		// Fill.
		Sprite.quad([
			curr.x + (loop * hillWidth), height / 2 - curr.y,
			nx + (loop * hillWidth), height / 2 - next.y,
			curr.x + (loop * hillWidth), height,
			nx + (loop * hillWidth), height
		], [...currentPalette[2], 255]);

		// Outline.
		Sprite.quad([
			curr.x + (loop * hillWidth), height / 2 - curr.y,
			nx + (loop * hillWidth), height / 2 - next.y,
			curr.x + (loop * hillWidth), height / 2 - curr.y + 5,
			nx + (loop * hillWidth), height / 2 - next.y + 5
		], [...currentPalette[0], 255]);

		if (nx + -camera.x + (loop * hillWidth) > width) {
			break;
		}

		// Loop around to start, but keep relative drawing position.
		n += 1;
		if (n >= hills.length) {
			n = 0;
			loop += 1;
		}
	}

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
	while (hills[approx] !== undefined && hills[approx].x > nx) {
		approx--;
	}
	while (hills[approx] !== undefined && hills[approx].x < nx) {
		approx++;
	}
	if (approx >= hills.length) approx -= hills.length;
	if (approx < 1) { approx += hills.length; }

	//console.log(approx);
	return approx;
}

function getHill(index) {
	//console.log(DogeMath.wrap(index, 10));
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
 * using ukranian solution as a base
 */
function JacksAwesomeHillPos(px) {
	var i = findIndex(px);
	var a = getHill(i - 1);
	var b = getHill(i);
	var v = (px - a.x) / (b.x - a.x);
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
	JacksAwesomeHillPos,
	hillWidth
}
