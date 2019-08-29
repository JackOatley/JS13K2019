import * as world from "./world.js";
import { any } from "././lib/keyboard.js";
import * as math from "./dogemath.js";
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
	flying = false,
	displayAngle = angle;

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
		console.log("wrap");
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

	// Update position.
	posX += Math.cos(3.14 - angle) * vel * dt;
	posY += Math.sin(3.14 - angle) * -vel * dt;

	// Update visual rotation.
	// Makes it look smoother, without physically effecting collisions.
	displayAngle += math.getAngleDifference(angle, displayAngle) / 2;

	// Move camera.
	camera.toX = posX + 240;
	camera.toY = - posY + 135;


}

function draw() {
	var x = posX;
	var y = height / 2 - posY;
	var a = 3.14 - displayAngle;
	spriteRobinHorizontal.draw(0, x, y, 1, 1, a, [...currentPalette[3], 255]);
}

export {
	init,
	update,
	draw
}
