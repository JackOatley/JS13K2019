import * as world from "./world.js";
import { any } from "././lib/keyboard.js";
import * as DogeMath from "./dogemath.js";
import { currentPalette, toCSS } from "./palette.js";
import { camera } from "./camera.js";
import { spriteRobinHorizontal } from "./sprites/robin_horizontal.js";

var width = 0,
	height = 0,
	posY = 0,
	posX = 50,
	angle = 0,
	vel = 3,
	g = 0.0098,
	flying = false;
/**
 *
 * @param {world} _world
 */
function init(_width, _height) {

	width = _width;
	height = _height;
	[posY, angle] = world.JacksAwesomeHillPos(posX);
}

function update(dt) {
	if (posX >= world.hillWidth) {
		posX -= world.hillWidth;
		camera.x -= world.hillWidth;
		camera.cX -= world.hillWidth;
		camera.toX -= world.hillWidth;
	}

	var [hillY, hillAng] = world.JacksAwesomeHillPos(posX);

	if (posY <= hillY) {
		if (flying && angle < hillAng) {
			//vel += (hillAng - angle) * 0.1 * dt;
			console.log(vel, angle, hillAng);
		}
		flying = false;

		angle = hillAng;
		posY = hillY;
	} else {
		angle -= g * dt;
		flying = true;
	}


	posX += Math.cos(3.14 - angle) * vel * dt;
	posY += Math.sin(3.14 - angle) * -vel * dt;

	camera.toX = posX + 240;
	camera.toY = - posY + 135;


}

function draw(ctx) {
	spriteRobinHorizontal.draw(0, posX, height / 2 - posY, 1, 1, 3.14 - angle, [...currentPalette[3], 255]);
}

export {
	init,
	update,
	draw
}
