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
export function createItem(sprite, x, c) {
	const newItem = {}
	newItem.sprite = sprite;
	newItem.color = [...currentPalette[c], 255];
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
	for (var n=0; n<items.length; n+=1) {
		item = items[n];
		item.sprite.draw(0, item.x, 240 / 2 - item.y + 15, 1, 1, 3.14 - item.a, item.color);
	}
}
