import {Sprite} from "../sprite.js";

const canv = document.createElement("canvas");
canv.width = 120;
canv.height = 120;

const cont = canv.getContext("2d");
cont.beginPath();
cont.fillStyle = "white";
cont.arc(60, 60, 60, 0, 2 * Math.PI);
cont.fill();

export const sprite_sun = new Sprite(canv, 60, 60);
