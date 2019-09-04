/**
 * Creates a Worker using the given function. The function is converted into a
 * string, turned into a Blob, turning into an ObjectURL, then turning into a
 * Worker, finally!
 * @param {Function} fn
 * @return {Worker}
 */
export function buildWorker(fn) {
	var str = "(" + fn.toString() + ")()";
	return new Worker(URL.createObjectURL(new Blob([str], {
		type: "application/javascript"
	})));
}

/**
 *
 */
export function removeFromArray(item, array) {
	var index = array.indexOf(item);
	if (index !== -1) {
		array.splice(index, 1);
	}
}

/**
 *
 */
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
