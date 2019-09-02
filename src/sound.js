import {buildWorker} from "./lib/utils.js";
import {SoundBoxWorkerSource} from "./lib/soundbox.js";

//
export const audioArray = [];

// Setup SoundBox WebWorker.
const SoundBoxWorker = buildWorker(SoundBoxWorkerSource);
SoundBoxWorker.onmessage = (e) => {
	var id = e.data.id;
	if (typeof id === "number") {
		var sound = audioArray[id];
		sound.progress = ~~(100 * e.data.progress);
		if (e.data.progress === 1) {
			var audio = sound.instances[0];
			var blob = new Blob([e.data.buffer], {type: "audio/wav"});
			audio.src = URL.createObjectURL(blob);
			for (var n=1; n<sound.number; n++) {
				sound.instances[n] = sound.instances[0].cloneNode();
			}
			//sound.play();
		}
	}
};

var sndClick;

/**
 * @struct
 */
export class Sound {

	/**
	 * @param {Object} track
	 * @param {number=} number Number of Audio instances to create.
	 */
	constructor(track, number=1) {

		// Create a new audio object.
		this.progress = 0;
		this.number = number;
		this.instances = [new Audio()];

		// Send the sound data to the web worker.
		SoundBoxWorker.postMessage({
			cmd: "generate",
			song: track,
			id: audioArray.push(this) - 1,
			opts: undefined
		});

	}

	/**
	 * @return {void}
	 */
	play() {
		if (true) {
			for (var n=0; n<this.instances.length; n++) {
				if (this.instances[n].paused) {
					this.instances[n].play();
					break;
				}
			}
		}
	}

}
