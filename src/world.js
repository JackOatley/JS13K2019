import * as DogeMath from "./dogemath.js";
import { currentPalette, toCSS } from "./palette.js";
import { camera } from "./camera.js";
import { Sprite } from "./sprite.js";
import { ctx } from "./renderer.js";

var drawDebug = false;

var hills = [];
var hillWidth;
var midPoints;
var width = 0,
	height = 0,
	hHeight = 0;
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
	hHeight = height / 2;
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
 * @return {void}
 */
function draw() {
	if (drawDebug) ctx.beginPath();
	// Draw fill.
	var index = findIndex(camera.x - 60), curr = getHill(index), next = getHill(index + 1);
	while (next.x - camera.x < width + 10) {
		Sprite.quad([
			curr.x, curr.y,
			next.x, next.y,
			curr.x, height,
			next.x, height
		], currentPalette[2]);
		Sprite.quad([
			curr.x, curr.y,
			next.x, next.y,
			curr.x, curr.y + 5,
			next.x, next.y + 5
		], currentPalette[0]);
		if (drawDebug) {
			ctx.moveTo(curr.x + curr.l * hillWidth - camera.x, hHeight - curr.y - (curr.c ? 10 : 0) - camera.y);
			ctx.lineTo(curr.x + curr.l * hillWidth - camera.x, height - camera.y);
		}

		index++;
		curr = getHill(index);
		next = getHill(index + 1);
	}

	if (drawDebug) {
		ctx.lineWidth = 0.5;
		ctx.strokeStyle = "rgb(255,0,0,100)";
		ctx.stroke();
	}

}

/**
 * Finds the index of the closest Segment to the specified posX value
 * @param {number} posX
 */
function findIndex(posX) {
	//approximate position.
	var approx = ~~(posX / (hillWidth / midPoints)) * timeSteps;
	//step until you hit the closest point.
	while (hills[approx] !== undefined && hills[approx].x > posX) approx--
	while (hills[approx] !== undefined && hills[approx].x < posX) approx++;
	return approx;
}

/**
 * Returns Hill with its raw position.
 * @param {number} index 
 */
function getHillRaw(index) {
	let mult = index / hills.length;
	mult = mult < 0 ? Math.floor(mult) : ~~mult
	index -= mult * hills.length;
	return {
		x: hills[index].x,
		y: hills[index].y,
		l: mult
	};
}

/**
 * Returns Hill with its position relative to the world
 * @param {number} index 
 */
function getHill(index) {
	var hill = getHillRaw(index);
	return {
		x: hill.x + hill.l * hillWidth,
		y: hHeight - hill.y
	};
}

function getAngle(index) {
	var hill = getHill(index);
	var nextHill = getHill(index + 1);
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
	getHillRaw,
	getAngle,
	JacksAwesomeHillPos,
	hillWidth
}
