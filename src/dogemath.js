function lerp(value, target, ease) {
	return (target - value) / ease;
}

function eastIn(t, b, c, d) {
	return -c * (t /= d) * (t - 2) + b;
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

export {
	lerp,
	randomRange,
	getDistanceRaw,
	getDistance,
	eastIn
}