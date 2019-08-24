/**
 * Needs "unrestricted" because we assign integer properties to objects like
 * so: this[0] = x. We do this because we have generated functions and want
 * the code to remain working even after minification via Closure Compiler.
 * @unrestricted
 */
export class Matrix {

	/**
	 * Takes an optional 16 arguments to initialize the matrix with.
	 * If 16 arguments are not comitted then an identity matrix is returned.
	 * @param {...*} args
	 */
	constructor(args) {
		this[0] = new Float32Array(
			(arguments.length === 16)
				? [...arguments]
				: [ 1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1 ]
		);
		this.states = [];
	}

	/**
	 * @return {!Matrix}
	 */
	save() {
		this.states.push(this.clone());
		return this;
	}

	/**
	 * @return {!Matrix}
	 */
	restore() {
		return this.copy(this.states.pop());
	}

	/**
	 * @return {!Matrix}
	 */
	clone() {
		return new Matrix(...this[0]);
	}

	/**
	 * @param {!Matrix} matrix
	 */
	copy(matrix) {
		this[0].set(matrix[0]);
		return this;
	}

	/**
	 * Sets the matrix to the identity matrix.
	 * @return {!Matrix}
	 */
	identity() {
		var m = this[0];
		m[0] = m[5] = m[10] = m[15] = 1;
		m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0;
		return this;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @return {!Matrix}
	 */
	scale(x, y, z) {
		scalingMatrix[0] = x;
		scalingMatrix[5] = y;
		scalingMatrix[10] = z;
		return this.multiply(scaling);
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @return {!Matrix}
	 */
	translate(x, y, z) {
		translationMatrix[3] = x;
		translationMatrix[7] = y;
		translationMatrix[11] = z;
		return this.multiply(translation);
	}

	/**
	 * @param {number} a Radians.
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @return {!Matrix}
	 */
	rotate(a, x, y, z) {

		// Normalize.
		var d = Math.sqrt(x*x + y*y + z*z);
		if (x !== 0) x /= d;
		if (y !== 0) y /= d;
		if (z !== 0) z /= d;

		// Skew and scale.
		var c = Math.cos(a);
		var s = Math.sin(a);
		var t = 1 - c;

		//*
		return this.rotate2(
			x * x * t + c,
			x * y * t - z * s,
			x * z * t + y * s,

			y * x * t + z * s,
			y * y * t + c,
			y * z * t - x * s,

			z * x * t - y * s,
			z * y * t + x * s,
			z * z * t + c
		);
		//*/

		/*
		rotationMatrix[0] = x * x * t + c;
		rotationMatrix[1] = x * y * t - z * s;
		rotationMatrix[2] = x * z * t + y * s;

		rotationMatrix[4] = y * x * t + z * s;
		rotationMatrix[5] = y * y * t + c;
		rotationMatrix[6] = y * z * t - x * s;

		rotationMatrix[8] = z * x * t - y * s;
		rotationMatrix[9] = z * y * t + x * s;
		rotationMatrix[10] = z * z * t + c;

		return this.multiply(rotation);
		//*/
	}

	/**
	 * @param {!Matrix} mat
	 * @return {!Matrix}
	 */
	multiply(mat) {
		var a = this[0], b = mat[0], c = window["_ufmat"];

		c[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
		c[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
		c[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
		c[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

		c[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
		c[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
		c[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
		c[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

		c[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
		c[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
		c[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
		c[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

		c[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
		c[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
		c[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
		c[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

		[window["_ufmat"], this[0]] = [this[0], window["_ufmat"]];

		return this;
	}

	/**
	 *
	 */
	transpose() {
		var result = new Matrix();
		var m = this[0], r = result[0];
		r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
		r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
		r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
		r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];
		return result;
	};

	/**
	 * @return {!Array<number>}
	 */
	transformPoint(point) {

		var m = this[0];

		var x = point[0], y = point[1], z = point[2], w = point[3];

		var c1r1 = m[ 0], c2r1 = m[ 1], c3r1 = m[ 2], c4r1 = m[ 3],
			c1r2 = m[ 4], c2r2 = m[ 5], c3r2 = m[ 6], c4r2 = m[ 7],
			c1r3 = m[ 8], c2r3 = m[ 9], c3r3 = m[10], c4r3 = m[11],
			c1r4 = m[12], c2r4 = m[13], c3r4 = m[14], c4r4 = m[15];

		return [
			x*c1r1 + y*c1r2 + z*c1r3 + w*c1r4,
			x*c2r1 + y*c2r2 + z*c2r3 + w*c2r4,
			x*c3r1 + y*c3r2 + z*c3r3 + w*c3r4,
			x*c4r1 + y*c4r2 + z*c4r3 + w*c4r4
		];
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @param {number} w
	 * @return {!Array<number>}
	 */
	transposeTransformPoint(x, y, z, w) {
		var m = this[0];
		return [
			x*m[ 0] + y*m[ 1] + z*m[ 2] + w*m[ 3],
			x*m[ 4] + y*m[ 5] + z*m[ 6] + w*m[ 7],
			x*m[ 8] + y*m[ 9] + z*m[10] + w*m[11],
			x*m[12] + y*m[13] + z*m[14] + w*m[15]
		];
	}

	/**
	 * @param {!CanvasRenderingContext2D} ctx
	 * @return {!Matrix}
	 */
	setCanvasTransform(ctx) {
		var m = this[0];
		ctx.setTransform(m[0], m[4], m[1], m[5], m[3], m[7]);
		return this;
	}

}

/**
 * @param {number} takes Number of arguments the function takes.
 * @param {!Array} changes Matrix indices effected by arguments.
 * @return {function(...number)}
 * @example
 * preMultiply(3, [3, 7, 11]);
 */
function preMultiply(takes, changes) {
	var varNames = "defghijkl";						// Argument names.
	var b = "1000010000100001".split("");			// Matrix mapped to numbers/arguments.
	changes.forEach((i,n) => b[i] = varNames[n]);	// Impose arguments onto matrix.

	// This function is used to sift out unecessary multiplications.
	function comb(x, y) {
		return (b[y] == 0) ? `` : (b[y] == 1) ? `a[${x}]` : `a[${x}]*${b[y]}`;
	}

	var fnBody = ``;
	for (var n=0; n<16; n++) {
		var o1 = ~~(n / 4) * 4;
		var o2 = n - o1;

		//
		var summation = "", s, o;
		for (o=0; o<4; o++) {
			s = comb(o1+o, o2+o*4);
			summation += s ? summation ? `+${s}` : s : ``;
		}

		// Add this line to function body.
		fnBody += `c[${n}]=${summation};\n`;

	}

	//
	return new Function(...varNames.slice(0, takes),
		`var a=this[0],c=window["_ufmat"];${fnBody}
		[window["_ufmat"],this[0]]=[this[0],window["_ufmat"]];
		return this;`
	);

}

// Reusable matrices.
var translation = new Matrix(),
	rotation = new Matrix(),
	scaling = new Matrix(),
	translationMatrix = translation[0],
	rotationMatrix = rotation[0],
	scalingMatrix = scaling[0];

window["_ufmat"] = (new Matrix())[0];

Matrix.prototype.translate = preMultiply(3, [3, 7, 11]);
Matrix.prototype.scale = preMultiply(3, [0, 5, 10]);
Matrix.prototype.rotate2 = preMultiply(9, [0, 1, 2, 4, 5, 6, 8, 9, 10]);
