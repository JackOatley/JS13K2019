import {Sprite} from "../sprite.js";

const size = 200;

const canv = /** @type {!HTMLCanvasElement} */ (document.createElement("canvas"));
canv.width = size;
canv.height = size;

const cont = canv.getContext("2d");
cont.fillStyle = "white";
cont.arc(size/2, size/2, size/2, 0, 2 * Math.PI);
cont.fill();

export const sprite_sun = new Sprite(canv, size/2, size/2);
