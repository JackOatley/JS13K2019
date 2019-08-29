//import Renderer from "./Renderer.js";
import {gl, worldMatrix} from "./renderer.js";
import {Shader} from "./shader.js";
import {spriteShader} from "./shaders/shader_sprite.js";
import {TextureAtlas} from "././lib/texture_atlas.js";

const MAX_SPRITES = 10000;

//
var spriteShaderProgram = null,
	instances = [];

/**
 * @const
 */
export class Sprite {

	/**
	 * @param {Image|HTMLCanvasElement} img
	 * @param {number} xOffset
	 * @param {number} yOffset
	 */
	constructor(img, xOffset, yOffset) {

		//
		this.width = 0;
		this.height = 0;
		this.xOffset = xOffset;
		this.yOffset = yOffset;
		this.frames = [];
		this.isLoaded = false;
		instances.push(this);

		if (img) {
			this.width = img.width;
			this.height = img.height;
			this.addFrame(img, 0);
		}

	}

	/**
	 * @param {Image|HTMLCanvasElement} img
	 * @param {number} frame
	 * @return {void}
	 */
	addFrame(img, frame) {
		var canv = /** @type {!HTMLCanvasElement} */ (document.createElement("CANVAS"));
		var ctx = canv.getContext("2d");
		canv.width = this.width;
		canv.height = this.height;
		ctx.drawImage(
			img,
			frame*this.width, 0, this.width, this.height,
			0, 0, this.width, this.height
		);

		var coords = Sprite.atlas.pack(canv);
		this.frames.push({
			c: coords.c,
			x: coords.x,
			y: coords.y
		});

	}

	/**
	 * TODO: change color to UNSIGNED_BYTE.
	 * @param {number} index
	 * @param {number} x
	 * @param {number} y
	 * @param {number} xScale
	 * @param {number} yScale
	 * @param {number} rotation
	 * @param {Array<number>} color
	 * @return {void}
	 */
	draw(index, x, y, xScale, yScale, rotation, color) {

		worldMatrix.save();
		worldMatrix.translate(x, y, 0);
		worldMatrix.rotate(rotation, 0, 0, 1);

		// Get positions of the 4 vertices of the quad.
		// 1: top-left, 2: top-right, 3: bottom-right, 4: bottom-left.
		var x1 = 0 - this.xOffset * xScale;
		var y1 = 0 - this.yOffset * yScale;
		var x2 = x1;
		var y2 = y1 + this.height * yScale;
		var x3 = x1 + this.width * xScale;
		var y3 = y1;
		var x4 = x3;
		var y4 = y2;

		// Multiply quad vertex positions by transformMatrix.
		[x1, y1] = worldMatrix.transposeTransformPoint(x1, y1, 0, 1);
		[x2, y2] = worldMatrix.transposeTransformPoint(x2, y2, 0, 1);
		[x3, y3] = worldMatrix.transposeTransformPoint(x3, y3, 0, 1);
		[x4, y4] = worldMatrix.transposeTransformPoint(x4, y4, 0, 1);

		//
		worldMatrix.restore();

		// Get texture coordinates.
		// TODO: store these as UV coords in the first place.
		var l = this.frames.length;
		var frame = this.frames[((index % l) + l) % l];

		if (!frame) {
			return;
		}

		var uvx1 = frame.x / Sprite.atlas.width;
		var uvy1 = frame.y / Sprite.atlas.height;
		var uvx2 = (frame.x + this.width) / Sprite.atlas.width;
		var uvy2 = (frame.y + this.height) / Sprite.atlas.height;

		// Cache stuff.
		const i = Sprite.glBatchIndexQuads;
		const pos = Sprite.glBatchArrayQuads;
		const tex = Sprite.glBatchArrayQuadsTex;
		const col = Sprite.glColorsBuffer;

		// Add vertices to vertex buffer.
		pos[i] = x1;
		pos[i+1] = y1;
		pos[i+2] = pos[i+6] = x2;
		pos[i+3] = pos[i+7] = y2;
		pos[i+4] = pos[i+10] = x3;
		pos[i+5] = pos[i+11] = y3;
		pos[i+8] = x4;
		pos[i+9] = y4;

		// Add UV coordinates to texture buffer.
		tex[i] = tex[i+2] = tex[i+6] = uvx1;
		tex[i+1] = tex[i+5] = tex[i+11] = uvy1;
		tex[i+3] = tex[i+7] = tex[i+9] = uvy2;
		tex[i+4] = tex[i+8] = tex[i+10] = uvx2;

		// Color.
		const s = i * 2;
		const e = s + 24;
		const c0 = color[0];
		const c1 = color[1];
		const c2 = color[2];
		const c3 = color[3];
		for (var c = s; c < e; c += 4) {
			col[c] = c0;
			col[c+1] = c1;
			col[c+2] = c2;
			col[c+3] = c3;
		}

		// Increment index for next quad.
		Sprite.glBatchIndexQuads += 12;

	}

	/**
	 *
	 */
	static quad(points, color) {

		//worldMatrix.save();
		//worldMatrix.translate(x, y, 0);
		//worldMatrix.rotate(rotation, 0, 0, 1);

		// Get positions of the 4 vertices of the quad.
		// 1: top-left, 2: top-right, 3: bottom-right, 4: bottom-left.
		var x1 = points[0];
		var y1 = points[1];
		var x2 = points[2];
		var y2 = points[3];
		var x3 = points[4];
		var y3 = points[5];
		var x4 = points[6];
		var y4 = points[7];

		// Multiply quad vertex positions by transformMatrix.
		[x1, y1] = worldMatrix.transposeTransformPoint(x1, y1, 0, 1);
		[x2, y2] = worldMatrix.transposeTransformPoint(x2, y2, 0, 1);
		[x3, y3] = worldMatrix.transposeTransformPoint(x3, y3, 0, 1);
		[x4, y4] = worldMatrix.transposeTransformPoint(x4, y4, 0, 1);

		//
		//worldMatrix.restore();

		var uvx1 = 0.1;
		var uvy1 = 0.1;
		var uvx2 = 0.1;
		var uvy2 = 0.1;

		// Cache stuff.
		const i = Sprite.glBatchIndexQuads;
		const pos = Sprite.glBatchArrayQuads;
		const tex = Sprite.glBatchArrayQuadsTex;
		const col = Sprite.glColorsBuffer;

		// Add vertices to vertex buffer.
		pos[i] = x1;
		pos[i+1] = y1;
		pos[i+2] = pos[i+6] = x2;
		pos[i+3] = pos[i+7] = y2;
		pos[i+4] = pos[i+10] = x3;
		pos[i+5] = pos[i+11] = y3;
		pos[i+8] = x4;
		pos[i+9] = y4;

		// Add UV coordinates to texture buffer.
		tex[i] = tex[i+2] = tex[i+6] = uvx1;
		tex[i+1] = tex[i+5] = tex[i+11] = uvy1;
		tex[i+3] = tex[i+7] = tex[i+9] = uvy2;
		tex[i+4] = tex[i+8] = tex[i+10] = uvx2;

		// Color.
		const s = i * 2;
		const e = s + 24;
		const c0 = color[0];
		const c1 = color[1];
		const c2 = color[2];
		const c3 = color[3];
		for (var c = s; c < e; c += 4) {
			col[c] = c0;
			col[c+1] = c1;
			col[c+2] = c2;
			col[c+3] = c3;
		}

		// Increment index for next quad.
		Sprite.glBatchIndexQuads += 12;

	}

	/**
	 * @return {void}
	 */
	static batchStart() {
		Sprite.glBatchIndexQuads = 0;
	}

	/**
	 * @return {void}
	 */
	static batchEnd() {

		// Avoid drawing an empty array as that spews out warnings.
		if (!Sprite.glBatchIndexQuads) {
			return;
		}

		// Setup the attributes to pull data from our buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, Sprite.vertexBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, Sprite.glBatchArrayQuads);
		gl.enableVertexAttribArray(Sprite.positionLocation);
		gl.vertexAttribPointer(Sprite.positionLocation, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, Sprite.coordsBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, Sprite.glBatchArrayQuadsTex);
		gl.enableVertexAttribArray(Sprite.texcoordLocation);
		gl.vertexAttribPointer(Sprite.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, Sprite.colorsBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, Sprite.glColorsBuffer);
		gl.enableVertexAttribArray(Sprite.colorLocation);
		gl.vertexAttribPointer(Sprite.colorLocation, 4, gl.UNSIGNED_BYTE, true, 0, 0);

		// Draw the quad (2 triangles, 6 vertices).
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		gl.useProgram(spriteShaderProgram);
		gl.uniform1i(Sprite.textureLocation, 0);
		gl.drawArrays(gl.TRIANGLES, 0, Sprite.glBatchIndexQuads/2);
	}

	/**
	 * @return {void}
	 */
	static init() {

		//
		spriteShaderProgram = Shader.create(gl, spriteShader);
		gl.useProgram(spriteShaderProgram);
		var matrixLoc = gl.getUniformLocation(spriteShaderProgram, "uMatrix");
		gl.uniformMatrix3fv(matrixLoc, false, [
			2 / 480, 0, 0,
			0, -2 / 270, 0,
			-1, 1, 1
		]);

		//
		Sprite.atlas.createGLTexture();
		Sprite.atlas.bind(0);

		// Get shader attribute/uniform locations.
		Sprite.positionLocation = gl.getAttribLocation(spriteShaderProgram, 'aSpritePosition');
		Sprite.texcoordLocation = gl.getAttribLocation(spriteShaderProgram, 'aTextureCoord');
		Sprite.colorLocation = gl.getAttribLocation(spriteShaderProgram, 'aColor');
		Sprite.textureLocation = gl.getUniformLocation(spriteShaderProgram, "uSpriteTexture")

		// Initialize vertex buffer.
		Sprite.vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, Sprite.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, Sprite.glBatchArrayQuads, gl.DYNAMIC_DRAW);

		// Initialize coordinates buffer.
		Sprite.coordsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, Sprite.coordsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, Sprite.glBatchArrayQuadsTex, gl.DYNAMIC_DRAW);

		// Initialize color buffer.
		Sprite.colorsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, Sprite.colorsBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, Sprite.glColorsBuffer, gl.DYNAMIC_DRAW);

	}

	/**
	 * @return {boolean}
	 */
	static isLoading() {
		for (var n = 0; n < instances.length; n += 1) {
			if (!instances[n].isLoaded) {
				return true;
			}
		}
		return false;
	}

}

// Shader attribute locations.
Sprite.positionLocation = 0;
Sprite.texcoordLocation = 0;
Sprite.textureLocation = null;
Sprite.locColor = 0;

// Buffers.
Sprite.vertexBuffer = null;
Sprite.coordsBuffer = null;
Sprite.colorsBuffer = null;

//
Sprite.atlas = new TextureAtlas();
Sprite.texture = null;
Sprite.glBatchArrayQuads = new Float32Array(MAX_SPRITES*12);
Sprite.glBatchArrayQuadsTex = new Float32Array(MAX_SPRITES*12);
Sprite.glColorsBuffer = new Uint8Array(MAX_SPRITES*24);

/**
 * Temporary solution to creating a Sprite from a base64 encoded PNG.
 * @const
 */
export class SpriteBase64 extends Sprite {

	constructor(str, xOffset, yOffset) {

		super(null, xOffset, yOffset);
		this.width = 0;
		this.height = 0;
		this.xOffset = xOffset;
		this.yOffset = yOffset;
		this.frames = [];
		this.isLoaded = false;
		instances.push(this);

		var image = new Image();
		image.onload = () => {
			this.width = image.width;
			this.height = image.height;
			this.addFrame(image, 0);
		}
		image.src = "data:image/png;base64," + str;

	}

}

/**
 * Temporary solution to creating a Sprite from a base64 encoded PNG.
 * @const
 */
export class SpriteSheetBase64 {

	constructor(str, atlas) {

		this.map = {}

		var image = new Image();
		image.onload = () => {

			Object.keys(atlas).forEach((key) => {
				var x, y, w, h, coords, canv, cont;
				coords = atlas[key];
				x = coords[0];
				y = coords[1];
				w = coords[2];
				h = coords[3];
				canv = document.createElement("canvas");
				canv.width = w;
				canv.height = h;
				cont = canv.getContext("2d");
				cont.drawImage(image, x, y, w, h, 0, 0, w, h);
				this.map[key] = new Sprite(canv, 0, 0);
			});

		}
		image.src = "data:image/png;base64," + str;

	}

	/**
	 *
	 */
	draw(key, x, y, sx, sy, r, c) {
		this.map[key].draw(0, x, y, sx, sy, r, c);
	}

	/**
	 *
	 */
	drawText(txt, x, y, c) {
		for (var n=0; n<txt.length; n+=1) {
			var key = txt[n];
			if (this.map[key]) {
				this.map[key].draw(0, x, y, 1, 1, 0, c);
				x += this.map[key].width + 2;
			}
		}
	}

	/**
	 *
	 */
	drawTextShadowed(txt, x, y, c1, c2) {
		this.drawText(txt, x+2, y, c1);
		this.drawText(txt, x, y+2, c1);
		this.drawText(txt, x, y, c2);
	}

	/**
	 *
	 */
	textLength(txt) {
		var length = 0;
		for (var n=0; n<txt.length; n+=1) {
			var key = txt[n];
			if (this.map[key]) {
				length += this.map[key].width + 2;
			}
		}
		return length - 2;
	}

}
