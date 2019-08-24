import {Sprite} from "../sprite.js";

const canv = document.createElement("canvas");
canv.width = 58;
canv.height = 58;

const cont = canv.getContext("2d");
cont.beginPath();
cont.fillStyle = "white";
cont.arc(29, 29, 29, 0, 2 * Math.PI);
cont.fill();

export const sprite_sun = new Sprite(canv, 29, 29);
