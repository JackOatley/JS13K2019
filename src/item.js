import * as world from "./world.js";
import {currentPalette} from "./palette.js";
import {camera} from "./camera.js";
import {wrap} from "./dogemath.js";

/**
 *
 */
export const items = [];

/**
 * @param {Sprite} sprite
 * @param {number} x
 * @return {Object}
 */
export function createItem(sprite, x, c, s) {
	const newItem = {}
	newItem.sprite = sprite;
	newItem.color = c;
	newItem.scale = s;
	newItem.x = x;
	[newItem.y, newItem.a] = world.JacksAwesomeHillPos(x);
	items.push(newItem);
	return newItem;
}

/**
 * @return {void}
 */
export function drawItems() {
	var item = null;
	var c = [], s = 0;
	for (var n=0; n<items.length; n+=1) {
		item = items[n];
		c = [...currentPalette[item.color], 255];
		s = item.scale;

		// Handle wrapping.
		var dx = item.x;
		if (dx-camera.x < -50) { dx += world.hillWidth; }
		else if (dx-(camera.x+240) > 290) { dx -= world.hillWidth; }

		// Draw
		item.sprite.draw(0, dx, 240 / 2 - item.y + 15, s, s, 3.14 - item.a, c);

	}
}
