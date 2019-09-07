/**
 *
 */
const pretend = true;

/**
 * @type {boolean}
 */
export var isSubscriber = false;

/**
 * @return {void}
 */
export function update() {
	if (pretend) {
		isSubscriber = true;
		return;
	}
	const monetization = document.monetization;
	isSubscriber = monetization && monetization.state === "started";
}
