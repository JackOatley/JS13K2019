import * as world from "./world.js";
import * as player from "./player.js";
import {createItem, destroyItem, drawItems} from "./item.js";
import * as sprites from "./sprites/sprite_list.js";
import {currentPalette} from "./palette.js";
import {ctxCanvas, worldMatrix} from "./renderer.js";
import {coinsfx} from "./snd/coinsfx.js";

/**
 * @return {void}
 */
export function draw() {

	// Cache colors.
	const c1 = currentPalette[3];
	const c2 = currentPalette[0];

	// Title text.
	var text = "ROUND ROBIN";
	var centerX = ctxCanvas.width / 2 - sprites.font.textLength(text) / 2;
	var centerY = ctxCanvas.height / 2 - 90;
	sprites.font.drawTextShadowed(text, centerX, centerY, c1, c2);

	// Poor excuse!
	text = "This game is very much a WIP!";
	centerX = ctxCanvas.width / 2 - sprites.font.textLength(text) / 2;
	centerY = ctxCanvas.height / 2 - 38;
	sprites.font.drawTextShadowed(text, centerX, centerY, c1, c2);

	// Warning!
	text = "Do NOT raise your expectations!";
	centerX = ctxCanvas.width / 2 - sprites.font.textLength(text) / 2;
	centerY = ctxCanvas.height / 2 - 6;
	sprites.font.drawTextShadowed(text, centerX, centerY, c1, c2);

	// Coil instructions.
	text = "Coil users - Press Q to swap palettes!";
	centerX = ctxCanvas.width / 2 - sprites.font.textLength(text) / 2;
	centerY = ctxCanvas.height / 2 + 40;
	sprites.font.drawTextShadowed(text, centerX, centerY, c1, c2);

	// Coil instructions.
	if ((performance.now()/100) % 5 < 4) {
		text = "Press an arrow key to start!";
		centerX = ctxCanvas.width / 2 - sprites.font.textLength(text) / 2;
		centerY = ctxCanvas.height / 2 + 100;
		sprites.font.drawTextShadowed(text, centerX, centerY, c1, c2);
	}

}
