import {Sound} from "../sound.js";

// Song data
export const coinsfx = new Sound({
  songData: [
	{ // Instrument 0
	  i: [
	  0, // OSC1_WAVEFORM
	  100, // OSC1_VOL
	  158, // OSC1_SEMI
	  0, // OSC1_XENV
	  0, // OSC2_WAVEFORM
	  49, // OSC2_VOL
	  164, // OSC2_SEMI
	  151, // OSC2_DETUNE
	  0, // OSC2_XENV
	  0, // NOISE_VOL
	  5, // ENV_ATTACK
	  6, // ENV_SUSTAIN
	  59, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  195, // LFO_AMT
	  6, // LFO_FREQ
	  1, // LFO_FX_FREQ
	  2, // FX_FILTER
	  135, // FX_FREQ
	  0, // FX_RESONANCE
	  0, // FX_DIST
	  32, // FX_DRIVE
	  147, // FX_PAN_AMT
	  6, // FX_PAN_FREQ
	  121, // FX_DELAY_AMT
	  6 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [1],
	  // Columns
	  c: [
		{n: [135],
		 f: []}
	  ]
	},
  ],
  rowLen: 5513,   // In sample lengths
  patternLen: 3,  // Rows per pattern
  endPattern: 0,  // End pattern
  numChannels: 1  // Number of channels
}, 10);
