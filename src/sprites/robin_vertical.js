import {Sprite} from "../sprite.js";

export var spriteRobinVertical = new Image();
spriteRobinVertical.onload = function() {
	spriteRobinVertical = new Sprite(spriteRobinVertical, 16, 9);
	console.log("Loaded spriteRobinVertical!");
}
spriteRobinVertical.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAZAQMAAAAc+wxZAAAABlBMVEUAAAD///+l2Z/dAAAACXBIWXMAAAsSAAALEgHS3X78AAAAUElEQVQI12NgYGYAAvYGGMF/AEbIP2BgqLH/8IPhX/3PPwz1////YLD///8DhPX//39kMQQhW//rAQOH/AMHBgY5oAEMPAdgBO8BFDtYGhgAfZ0tyrhpqgsAAAAASUVORK5CYII=";
