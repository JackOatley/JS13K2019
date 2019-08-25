import {Sprite} from "../sprite.js";

export var spriteRobinHorizontal = new Image(34, 18);
spriteRobinHorizontal.onload = function() {
	spriteRobinHorizontal = new Sprite(spriteRobinHorizontal, 16, 9);
	console.log("Loaded spriteRobinHorizontal!");
}
spriteRobinHorizontal.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAASAQMAAAAE854sAAAABlBMVEUAAAD///+l2Z/dAAAACXBIWXMAAAsSAAALEgHS3X78AAAAUElEQVQI1x2MsQ2AQAwDI1GkgwWQWIPuF0OC0RiFESi/eHHYiZQrzrIjIp/QLa+5dbMVGcLE5xAuabgD7E/opdVK8EJTqAFczcOcjViLu/4HJKUfCzeOqUwAAAAASUVORK5CYII=";
