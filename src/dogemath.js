const PI = Math.PI;
const TAU = PI * 2;
export const DEG2RAD = PI / 180;

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

function getDistanceSquared(x1, y1, x2, y2) {
	var x = x1 - x2;
	var y = y1 - y2;
	return x * x + y * y;
}

function getDistance(x1, y1, x2, y2) {
	return Math.sqrt(getDistanceSquared(x1, y1, x2, y2));
}

function getAngle(p1, p2) {
	return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

/**
 * @param {!number} a
 * @param {!number} n
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
	getDistanceSquared,
	getDistance,
	getAngle,
	getAngleDifference,
	mod,
	wrap
}
