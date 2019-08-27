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
