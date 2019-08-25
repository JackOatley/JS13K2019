import {Matrix} from "./matrix.js";

// Get contexts.
export const worldMatrix = new Matrix();

// Create WebGL canvas.
export const glCanvas = document.createElement("canvas");
document.body.appendChild(glCanvas);
glCanvas.width = 480;
glCanvas.height = 270;
export const gl = glCanvas.getContext("webgl", {
	alpha: false,
	antialias: false,
	depth: false,
	premultipliedAlpha: true,
});

// Initialize settings.
gl.enable(gl.BLEND);

// Create 2D context canvas (will be used for GUI)
export const ctxCanvas = document.createElement("canvas");
document.body.appendChild(ctxCanvas);
ctxCanvas.width = 480;
ctxCanvas.height = 270;
export const ctx = ctxCanvas.getContext("2d");	// We WILL need alpha on this canvas.
