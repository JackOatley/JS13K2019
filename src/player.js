import * as world from "./world.js";
import { any } from "././lib/keyboard.js";
import * as DogeMath from "./dogemath.js";
import { currentPalette, toCSS } from "./palette.js";
import { camera } from "./camera.js";
import { spriteRobinHorizontal } from "./sprites/robin_horizontal.js";

var width = 0,
	height = 0,
	posY = 0,
	posX = 240,
	angle = 0,
	velY = 0,
	velX = 0,
	vel = 2,
	g = 0.098,
	minVX = 0.10,
	hillY = 0;
/**
 * 
 * @param {world} _world 
 */
function init(_width, _height) {

	width = _width;
	height = _height;
	[posY, angle] = world.JacksAwesomeHillPos(50);
}

function update(dt) {
	[hillY, angle] = world.JacksAwesomeHillPos(50);
	camera.toY = -posY + 75;

	if (posY <= hillY) posY = hillY;
	else velY -= g * dt;
	if (velX < minVX) velX += g * dt;

	posX += Math.cos(3.14 - angle) * vel * dt;
	posY += Math.sin(3.14 - angle) * vel * dt;

	camera.toX = posX;
	camera.toY = - posY + 75;


}

function draw(ctx) {
	spriteRobinHorizontal.draw(0, 50 + camera.x, height / 2 - posY - 10, 1, 1, 3.14 - angle, [...currentPalette[3], 255]);
}

export {
	init,
	update,
	draw
}