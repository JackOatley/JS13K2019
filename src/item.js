import * as world from "./world.js";
import { currentPalette } from "./palette.js";
import { camera } from "./camera.js";
import { wrap } from "./dogemath.js";
import {Sprite} from "./sprite.js";
import {removeFromArray} from "./lib/utils.js";

/**
 *
 */
export const items = [];

/**
 * @param {!Sprite|!SpriteBase64} sprite
 * @param {!number} x
 * @param {!number} y
 * @param {!number} colorIndex Color
 * @param {!number} scale
 * @return {!Object}
 */
export function createItem(sprite, x, y, colorIndex, scale) {
	const newItem = {}
	newItem.sprite = sprite;
	newItem.color = colorIndex;
	newItem.scale = scale;
	newItem.x = x;
	newItem.y = y;
	newItem.a = 0;
	if (y === -1) {
		[newItem.y, newItem.a] = world.JacksAwesomeHillPos(x, -1);
	}
	items.push(newItem);
	return newItem;
}

/**
 *
 */
export function destroyItem(item) {
	removeFromArray(item, items);
}

/**
 * @return {void}
 */
export function drawItems() {
	var item = null;
	var c = [], s = 0;
	for (var n = 0; n < items.length; n += 1) {
		item = items[n];
		c = [...currentPalette[item.color], 255];
		s = item.scale;

		// Handle wrapping.
		var dx = item.x;
		if (dx - camera.x < -50) { dx += world.hillWidth; }
		else if (dx - (camera.x + 240) > 290) { dx -= world.hillWidth; }

		// Draw
		if (item.sprite instanceof Sprite) {
			item.sprite.draw(0, dx, item.y , s, s, 3.14 + item.a, c);
		} else {
			item.sprite(dx, item.y);
		}

	}
}
