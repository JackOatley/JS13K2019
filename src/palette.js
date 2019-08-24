/**
 * Palette colors ordered from lightest to darkest.
 *
 * @example
 * var [lightest, light, dark, darkest] = palette[0];
 *
 */
export const palette = [

	// Pink (Default).
	[
		[228, 228, 228],
		[233, 194, 194],
		[220, 155, 155],
		[119, 54, 112]
	]

];

/**
 *
 */
export var currentPalette = palette[0];

/**
 * @param {Array} c Palette color.
 */
export function toCSS(c) {
	return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}
