import {gl} from "./renderer.js";

/**
 * The TextureAtlas class' purpose is to take many smaller canvases and store
 * them on a single canvas. The idea being that this would prevent texture swaps.
 * However, this currently makes Canvas (drawImage) performance worse, the exact
 * reason I don't know, seemingly larger canvases draw slower regardless of
 * clipping. But it should help in the future with a WebGL implementation.
 * One thing worth noting is that it's constant speed, whereas lots of smaller
 * canvases are subject to drastic speed changes depending on rendering mode. So
 * ultimately they may be roughly the same speed, it's too hard to tell!! >.<
 */
export class TextureAtlas {

	/**
	 *
	 */
	constructor() {

		this.width = 1024;
		this.height = 1024;
		this.padding = 4;
		this.canvas = /**@type {HTMLCanvasElement}*/ (document.createElement("canvas"));
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = /**@type {CanvasRenderingContext2D}*/ (this.canvas.getContext("2d"));
		this.context.fillStyle = "black";
		this.context.fillRect(0, 0, this.width, this.height);
		this.lookupGrid = [];
		this.glTexture = null;
		this.glIndex = 0;

		// Setup lookupGrid.
		for (var x=0; x<this.width; x++) {
			this.lookupGrid[x] = [];
			for (var y=0; y<this.height; y++) {
				this.lookupGrid[x][y] = false;
			}
		}

	}

	/**
	 * @param {WebGLRenderingContext} gl
	 * @return {void}
	 */
	createGLTexture() {
		this.glTexture = gl.createTexture();
		this.upload();
	}

	/**
	 * @param {number} index
	 * @return {void}
	 */
	bind(index) {
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.activeTexture(gl.TEXTURE0 + index);
	}

	/**
	 * Upload canvas data to GL Texture.
	 * @param {WebGLRenderingContext} gl
	 * @return {void}
	 */
	upload() {
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	}

	/**
	 * @param {!HTMLCanvasElement|!Image} img
	 * @return {?{c:HTMLCanvasElement, x:number, y:number}}
	 */
	pack(img) {

		// Apply padding space.
		const p = this.padding;			// Cache stuff.
		const lw = this.width - p;		// Atlas padding/loop count.
		const lh = this.height - p;
		const iw = img.width + p;		// Sprite padding.
		const ih = img.height + p;

		// Find a free space.
		for (var x=p; x<lw; x++)
		for (var y=p; y<lh; y++) {
			if (this.isFree(x, y, iw, ih)) {
				this.mark(x, y, iw, ih, true)
				this.context.drawImage(img, x, y);

				// Move this to only execute once.
				this.bind(0);
				this.upload();

				return {
					c: this.canvas,
					x: x,
					y: y
				};
			}
		}

		// Well, this SHOULDN'T happen...
		return null;

	}

	/**
	 * @param {Sprite} sprite
	 * @return {void}
	 */
	clear(sprite) {

		// Apply padding space.
		const p = this.padding;			// Cache stuff.
		const lw = this.width - p;		// Atlas padding/loop count.
		const lh = this.height - p;
		const iw = sprite.width + p;		// Sprite padding.
		const ih = sprite.height + p;

		// Free space.
		var frame = sprite.frames[0];
		var x = frame.x;
		var y = frame.y;
		var w = sprite.width + p;
		var h = sprite.height + p;
		this.mark(x, y, w, h, false);
		this.context.clearRect(x, y, w, h);

		// Update the texture uploaded to GL.
		if (this.glTexture) {
			this.upload();
		}

	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} w
	 * @param {number} h
	 * @return {boolean}
	 */
	isFree(x, y, w, h) {
		for (var i=x; i<x+w; i++)
		for (var j=y; j<y+h; j++) {
			if (this.lookupGrid[i][j] !== false) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Marks the given area as occupied, preventing other images from being
	 * stored here later.
	 * @param {number} x
	 * @param {number} y
	 * @param {number} w
	 * @param {number} h
	 * @param {boolean} value
	 * @return {void}
	 */
	mark(x, y, w, h, value) {
		for (var i=x; i<x+w; i++)
		for (var j=y; j<y+h; j++) {
			this.lookupGrid[i][j] = value;
		}
	}

}
