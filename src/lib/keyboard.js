
const _pressed = {};
const _down = {};
const _released = {};
const hotkeyEvents = {};

/**
* @return {void}
*/
export function init() {

	// Disables right click context menu.
	window.addEventListener("contextmenu", (e) => {
		//e.preventDefault();
	}, false);

	// Handle key press.
	window.addEventListener("keydown", (e) => {
		if (!_down[e.key.toUpperCase()]) {
			_pressed[e.key.toUpperCase()] = true;
		}
		_down[e.key.toUpperCase()] = true;
		//e.preventDefault();
	}, false);

	// Handle key release.
	window.addEventListener("keyup", (e) => {
		_down[e.key.toUpperCase()] = false;
		_released[e.key.toUpperCase()] = true;
		//e.preventDefault();
	}, false);

}

/**
 * Clears key states.
 * @return {void}
 */
export function update() {
	var pressed = _pressed;
	var released = _released;
	var events = hotkeyEvents;
	for (var key in _down) {
		if (pressed[key] && events[key]) { events[key](); }
		pressed[key] = released[key] = false;
	}
}

/**
 * @param {string} key
 * @return {boolean}
 */
export function pressed(key) {
	return _pressed[key] === true;
}

/**
 * Returns true if any one or more given keys are being held down.
 * @param {...string} args
 * @return boolean
 */
export function any(args) {
	for (var n=arguments.length-1; n>=0; n--) {
		if (_down[arguments[n]]) {
			return true;
		}
	}
	return false;
}

/**
 * Returns true if all the given keys are being held down.
 * @param {...string} args
 * @return boolean
 */
export function all(args) {
	for (var n=arguments.length-1; n>=0; n--) {
		if (!_down[arguments[n]]) {
			return false;
		}
	}
	return true;
}
