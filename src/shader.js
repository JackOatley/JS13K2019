/**@typedef {{vertex: string, fragment: string}}*/
var ShaderSource;

/**
 * @struct
 */
export const Shader = {

	/**
	 * @param {!WebGLRenderingContext} gl
	 * @param {!ShaderSource} shader
	 * @return {!WebGLProgram}
	 */
	create(gl, shader) {

		// Compile shader sources.
		const v = Shader.compile(gl, gl.VERTEX_SHADER, shader.vertex);
		const f = Shader.compile(gl, gl.FRAGMENT_SHADER, shader.fragment);

		// Build shader program.
		const p = gl.createProgram();
		gl.attachShader(p, v);
		gl.attachShader(p, f);
		gl.linkProgram(p);

		// Check everything worked!
		const status = gl.getProgramParameter(p, gl.LINK_STATUS);
		if (!status) {
			throw new TypeError(
				`couldn't link shader program:\n${gl.getProgramInfoLog(p)}`
			);
		}

		return p;

	},

	/**
	 * @param {!WebGLRenderingContext} gl
	 * @param {number} type
	 * @param {string} source
	 * @return {!WebGLShader}
	 */
	compile(gl, type, source) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!status) {
			throw new TypeError(`couldn't compile shader:\n${gl.getShaderInfoLog(shader)}`);
		}

		return shader;
	}

}
