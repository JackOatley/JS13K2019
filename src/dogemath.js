const PI = Math.PI;
const TAU = PI * 2;

function ease(value, target, ease) {
	return (target - value) / ease;
}

function lerp(start, target, time) {
	return target * time + start * (1 - time);
}

function easeIn(start, change, time, duration) {
	return -change * (time / duration) * (time - 2) + start;
}
/**
 * Generates a random number between the specified range
 * @param {number} min
 * @param {number} max
 */
function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

function getDistanceRaw(o1, o2) {
	var x = o1.x - o2.x;
	var y = o1.y - o2.y;
	return x * x + y * y;
}

function getDistance(o1, o2) {
	return Math.sqrt(getDistanceRaw(o1, o2));
}

function getAngle(p1, p2) {
	return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

/**
 * @param {!number} a
 * @param {!number} b
 * @return {!number}
 */
function mod(a, n) {
	return a - Math.floor(a / n) * n;
}

/**
 * @param {!number} a
 * @param {!number} b
 * @return {!number}
 */
function getAngleDifference(a, b) {
	return mod((a - b) + PI, TAU) - PI;
}

/**
 *
 */
function wrap(n, e) {
	return ((n % e) + e) % e;
}

export {
	lerp,
	ease,
	easeIn,
	randomRange,
	getDistanceRaw,
	getDistance,
	getAngle,
	getAngleDifference,
	mod,
	wrap
}
