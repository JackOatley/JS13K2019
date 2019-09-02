import * as world from "./world.js";
import * as keyboard from "././lib/keyboard.js";
import * as math from "./dogemath.js";
import { currentPalette, toCSS } from "./palette.js";
import { camera } from "./camera.js";
import { spriteRobinHorizontal, spriteRobinVertical } from "./sprites/sprite_list.js";

var width = 0,
	height = 0,
	posY = 0,
	posX = 50,
	angle = 0,
	vel = 3,
	g = 0.0098,
	flying = false,
	facing = 1,
	displayAngle = angle,
	sprite = spriteRobinHorizontal;

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

	facing = Math.sign(math.getAngleDifference(angle, 270*math.DEG2RAD));

	if (posY <= hillY) {
		//if (flying) {
			//var nextHill = world.getHill(world.findIndex(posX) + 1);
			// if (hillY > nextHill.y)
			// 	vel += (angle - hillAng) * 0.1 * dt;
			//console.log(vel, angle, hillAng);
		//}
		flying = false;
		angle = hillAng;
		posY = hillY;
	} else if (posY - hillY >= 0.5) {
		angle += g * facing * dt;
		flying = true;
	}

	// Control.
	var boost = vel;
	sprite = spriteRobinHorizontal;
	if (keyboard.any("ARROWRIGHT")) { sprite = spriteRobinVertical; angle -= 0.1; }
	if (keyboard.any("ARROWLEFT")) { sprite = spriteRobinVertical; angle += 0.1; }
	if (keyboard.all("ARROWLEFT", "ARROWRIGHT")) { boost *= 2; }

	// Update position.
	posX += Math.cos(3.14 - angle) * boost * dt;
	posY += Math.sin(3.14 - angle) * -boost * dt;

	// Update visual rotation.
	// Makes it look smoother, without physically effecting collisions.
	displayAngle += math.getAngleDifference(angle, displayAngle) / 2;

	// Move camera.
	camera.toX = posX + Math.cos(3.14 - displayAngle) * 240;
	camera.toY = (-posY + 135) + Math.sin(3.14 - displayAngle) * 200;


}

function draw() {
	var x = posX;
	var y = height / 2 - posY;
	var a = 3.14 - displayAngle;
	sprite.draw(0, x, y, 1, -facing, a, [...currentPalette[3], 255]);
}

export {
	init,
	update,
	draw
}
