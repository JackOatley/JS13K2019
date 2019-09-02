import {Sprite} from "../sprite.js";

const numberOfClouds = 5;
export const cloudsArray = [];

for (var n=0; n<numberOfClouds; n+=1) {

	const canv = /**@type {!HTMLCanvasElement}*/ (document.createElement("canvas"));
	canv.width = 120;
	canv.height = 120;

	const cont = canv.getContext("2d");
	//cont.beginPath(); // NOT NEEDED?
	for (var i=0; i<20; i+=1) {
		var x = 60 - 40 + Math.random() * 80;
		var y = 60 - 20 + Math.random() * 40;
		cont.fillStyle = "white";
		cont.moveTo(60, 120);
		cont.arc(x, y, 15, 0, 2 * Math.PI);
		cont.fill();
	}

	cloudsArray[n] = new Sprite(canv, 60, 60);

}
