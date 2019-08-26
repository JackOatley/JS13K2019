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
	],

	[
		[228, 228, 228],
		[233, 194, 233],
		[220, 155, 220],
		[62, 54, 120]
	]

];

/**
 *
 */
export var currentPaletteIndex = 0;
export var currentPalette = palette[currentPaletteIndex];

/**
 * @param {Array} c Palette color.
 * @return {string} CSS color value.
 */
export function toCSS(c) {
	return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}

/**
 * @param {Array} c Palette color.
 * @return {!Array} 3-value array with 0.0-1.0 values.
 */
export function toGL(c) {
	return [c[0]/255, c[1]/255, c[2]/255];
}

/**
 *
 */
export function nextPalette() {
	currentPaletteIndex = (currentPaletteIndex + 1) % palette.length;
	currentPalette = palette[currentPaletteIndex];
}
