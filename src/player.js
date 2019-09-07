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
	sprite = spriteRobinHorizontal,
	energy = 10,
	gold = 0;

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

	// Wrap when going right.
	if (posX >= world.hillWidth) {
		posX -= world.hillWidth;
		camera.x -= world.hillWidth;
		camera.cX -= world.hillWidth;
		camera.toX -= world.hillWidth;
	}

	// Wrap when going left.
	if (posX < 0) {
		posX += world.hillWidth;
		camera.x += world.hillWidth;
		camera.cX += world.hillWidth;
		camera.toX += world.hillWidth;
	}

	var [hillY, hillAng] = world.JacksAwesomeHillPos(posX, facing);
	facing = Math.sign(math.getAngleDifference(angle, 270*math.DEG2RAD));

	if (posY >= hillY) {
		if (flying) {
			//var nextHill = world.getHill(world.findIndex(posX) + 1);
			// if (hillY > nextHill.y)
			// 	vel += (angle - hillAng) * 0.1 * dt;
			let diff = math.getAngleDifference(angle, hillAng);
			if (diff <= 0.5) {
				console.log("Perfect landing!");
			}
			else {
				console.log("Bodged landing!");
			}
		}
		flying = false;
		angle = hillAng;
		posY = hillY;
		energy = Math.min(energy + 0.2, 10);
	} else if (posY - hillY <= 0.5) {
		angle -= g * facing * dt;
		flying = true;
	}

	// Control.
	var boost = vel;
	sprite = spriteRobinHorizontal;
	if (energy > 0
	&& keyboard.any("ARROWRIGHT", "ARROWLEFT")
	&& !keyboard.all("ARROWRIGHT", "ARROWLEFT")) {
		sprite = spriteRobinVertical;
		energy -= 0.1;
		if (keyboard.any("ARROWRIGHT")) {
			angle += 0.1;
		}
		if (keyboard.any("ARROWLEFT")) {
			angle -= 0.1;
		}
	}

	// Update position.
	posX += Math.cos(3.14 - angle) * boost * dt;
	posY += Math.sin(3.14 - angle) * -boost * dt;

	// Update visual rotation.
	// Makes it look smoother, without physically effecting collisions.
	displayAngle += math.getAngleDifference(angle, displayAngle) / 2;

	// Move camera.
	if (!isNaN((1 + (hillY - posY) / 400))) {	// Hack, because hillY can be undefined aparently!
		camera.zoom = (1 + (hillY - posY) / 400);
	}
	camera.toX = posX + Math.cos(3.14 - displayAngle) * 240 / camera.zoom;
	if (hillY) {
		camera.toY = Math.min(
			hillY,
			posY + Math.sin(3.14 - displayAngle) * -200 / camera.zoom
		);
	}

}

/**
 *
 */
function addGold(n) {
	gold += n;
}

/**
 *
 */
function draw() {
	var x = posX;
	var y = posY;
	var a = 3.14 + displayAngle;
	sprite.draw(0, x, y, 1, -facing, a, [...currentPalette[3], 255]);
}

export {
	init,
	update,
	draw,
	energy,
	gold,
	posX as x,
	posY as y,
	addGold
}
