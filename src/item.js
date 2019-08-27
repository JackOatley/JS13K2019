import * as world from "./world.js";
import {currentPalette} from "./palette.js";

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
		item.sprite.draw(0, item.x, 240 / 2 - item.y + 15, s, s, 3.14 - item.a, c);
	}
}
