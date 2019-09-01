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
 * @param {number} w
 * @param {number} h
 */
function init(w, h) {
	width = w;
	height = h;
	angle = -3;
	posY = 50;
}

function update(dt) {
	if (posX >= world.hillWidth) {
		posX -= world.hillWidth;
		camera.x -= world.hillWidth;
		camera.cX -= world.hillWidth;
		camera.toX -= world.hillWidth;
	}

	var [hillY, hillAng] = world.JacksAwesomeHillPos(posX);

	if (posY >= hillY) {
		if (flying) {
			var nextHill = world.getHill(world.findIndex(posX) + 1);
			// if (hillY > nextHill.y)
			// 	vel += (angle - hillAng) * 0.1 * dt;
			//console.log(vel, angle, hillAng);
		}
		flying = false;

		angle = hillAng;
		posY = hillY;
	} else if (posY - hillY <= 0.5) {
		if (angle > -4)
			angle += g * dt;
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
	camera.toY = posY;


}

function draw() {
	var x = posX;
	var y = posY;
	var a = 3.14 + displayAngle;
	spriteRobinHorizontal.draw(0, x, y, 1, 1, a, [...currentPalette[3], 255]);
}

export {
	init,
	update,
	draw
}
