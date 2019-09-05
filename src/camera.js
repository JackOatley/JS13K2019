
/**
 *
 */
export const camera = {

	x: 0,
	y: 0,
	toX: 240,
	toY: 135,
	cX: 240,
	cY: 135,
	zoom: 1,

	/**
	 *
	 */
	update() {

		if (isNaN(camera.toX)) {
			console.error("toX is NaN!");
			return;
		}

		camera.cX += (camera.toX - camera.cX) / 10;
		camera.cY += (camera.toY - camera.cY) / 10;
		camera.x = camera.cX - 240 * camera.zoom;
		camera.y = camera.cY - 135 * camera.zoom;
	},

	/**
	 *
	 */
	moveTo(x, y) {
		camera.toX = x;
		camera.toY = y;
	}

}
