import {Sound} from "../sound.js";

// Song data
export const testMusic = new Sound({
  songData: [
	{ // Instrument 0
	  i: [
	  2, // OSC1_WAVEFORM
	  100, // OSC1_VOL
	  128, // OSC1_SEMI
	  0, // OSC1_XENV
	  3, // OSC2_WAVEFORM
	  201, // OSC2_VOL
	  128, // OSC2_SEMI
	  0, // OSC2_DETUNE
	  0, // OSC2_XENV
	  0, // NOISE_VOL
	  0, // ENV_ATTACK
	  6, // ENV_SUSTAIN
	  29, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  195, // LFO_AMT
	  4, // LFO_FREQ
	  1, // LFO_FX_FREQ
	  2, // FX_FILTER
	  50, // FX_FREQ
	  184, // FX_RESONANCE
	  119, // FX_DIST
	  244, // FX_DRIVE
	  147, // FX_PAN_AMT
	  6, // FX_PAN_FREQ
	  84, // FX_DELAY_AMT
	  6 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [,,,,,1,1,2,2,,,,,1,2,1,2,3,3,1,1,2,2],
	  // Columns
	  c: [
		{n: [116,,,,119,,,,118,,116,114,,,111,,116,,,,119,,,,118,,116,114,,,111],
		 f: []},
		{n: [114,,,,118,,,114,116,,118,119,,,111,,114,,,,118,,,114,116,,118,119,,,111],
		 f: []},
		{n: [116,,,,,,115,116,118,,,,,,116,118,119,,,,,,121,123,121,,118,,115],
		 f: []}
	  ]
	},
	{ // Instrument 1
	  i: [
	  3, // OSC1_WAVEFORM
	  255, // OSC1_VOL
	  152, // OSC1_SEMI
	  0, // OSC1_XENV
	  0, // OSC2_WAVEFORM
	  255, // OSC2_VOL
	  152, // OSC2_SEMI
	  12, // OSC2_DETUNE
	  0, // OSC2_XENV
	  0, // NOISE_VOL
	  2, // ENV_ATTACK
	  0, // ENV_SUSTAIN
	  60, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  0, // LFO_AMT
	  0, // LFO_FREQ
	  0, // LFO_FX_FREQ
	  2, // FX_FILTER
	  255, // FX_FREQ
	  0, // FX_RESONANCE
	  0, // FX_DIST
	  32, // FX_DRIVE
	  47, // FX_PAN_AMT
	  3, // FX_PAN_FREQ
	  175, // FX_DELAY_AMT
	  2 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [,,,,,,,,,1,2,1,2,,,,,,,1,1,2,2],
	  // Columns
	  c: [
		{n: [103,,,,,,,,,,,,103,,,,103,,,,,,,,,,,,109,,,,106,,,,,,,,,,,,106,,,,106,,,,,,,,,,,,104,,,,110,,,,,,,,,,,,112,,,,110,,,,,,,,,,,,101],
		 f: []},
		{n: [102,,,,,,,,,,,,103,,,,102,,,,,,,,,,,,108,,,,105,,,,,,,,,,,,106,,,,105,,,,,,,,,,,,103,,,,109,,,,,,,,,,,,112,,,,109,,,,,,,,,,,,100],
		 f: []}
	  ]
	},
	{ // Instrument 2
	  i: [
	  2, // OSC1_WAVEFORM
	  100, // OSC1_VOL
	  128, // OSC1_SEMI
	  0, // OSC1_XENV
	  3, // OSC2_WAVEFORM
	  201, // OSC2_VOL
	  128, // OSC2_SEMI
	  0, // OSC2_DETUNE
	  0, // OSC2_XENV
	  0, // NOISE_VOL
	  5, // ENV_ATTACK
	  6, // ENV_SUSTAIN
	  58, // ENV_RELEASE
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
	  p: [],
	  // Columns
	  c: [
	  ]
	},
	{ // Instrument 3
	  i: [
	  0, // OSC1_WAVEFORM
	  0, // OSC1_VOL
	  128, // OSC1_SEMI
	  0, // OSC1_XENV
	  0, // OSC2_WAVEFORM
	  0, // OSC2_VOL
	  128, // OSC2_SEMI
	  0, // OSC2_DETUNE
	  0, // OSC2_XENV
	  125, // NOISE_VOL
	  0, // ENV_ATTACK
	  1, // ENV_SUSTAIN
	  59, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  0, // LFO_AMT
	  0, // LFO_FREQ
	  0, // LFO_FX_FREQ
	  1, // FX_FILTER
	  193, // FX_FREQ
	  171, // FX_RESONANCE
	  0, // FX_DIST
	  29, // FX_DRIVE
	  39, // FX_PAN_AMT
	  3, // FX_PAN_FREQ
	  88, // FX_DELAY_AMT
	  3 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [,,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	  // Columns
	  c: [
		{n: [,,,,111,,,,,,,,111,,,,,,,,111,,,,,,,111,111],
		 f: []}
	  ]
	},
	{ // Instrument 4
	  i: [
	  0, // OSC1_WAVEFORM
	  255, // OSC1_VOL
	  116, // OSC1_SEMI
	  1, // OSC1_XENV
	  0, // OSC2_WAVEFORM
	  255, // OSC2_VOL
	  116, // OSC2_SEMI
	  0, // OSC2_DETUNE
	  1, // OSC2_XENV
	  0, // NOISE_VOL
	  4, // ENV_ATTACK
	  6, // ENV_SUSTAIN
	  35, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  0, // LFO_AMT
	  0, // LFO_FREQ
	  0, // LFO_FX_FREQ
	  2, // FX_FILTER
	  14, // FX_FREQ
	  0, // FX_RESONANCE
	  0, // FX_DIST
	  32, // FX_DRIVE
	  0, // FX_PAN_AMT
	  0, // FX_PAN_FREQ
	  0, // FX_DELAY_AMT
	  0 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	  // Columns
	  c: [
		{n: [127,,,,,127,,,127,,,,,,127,,127,,,,,127,,,127,,,,,,127],
		 f: []}
	  ]
	},
	{ // Instrument 5
	  i: [
	  0, // OSC1_WAVEFORM
	  0, // OSC1_VOL
	  140, // OSC1_SEMI
	  0, // OSC1_XENV
	  0, // OSC2_WAVEFORM
	  0, // OSC2_VOL
	  140, // OSC2_SEMI
	  0, // OSC2_DETUNE
	  0, // OSC2_XENV
	  60, // NOISE_VOL
	  4, // ENV_ATTACK
	  10, // ENV_SUSTAIN
	  34, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  187, // LFO_AMT
	  5, // LFO_FREQ
	  0, // LFO_FX_FREQ
	  1, // FX_FILTER
	  239, // FX_FREQ
	  135, // FX_RESONANCE
	  0, // FX_DIST
	  32, // FX_DRIVE
	  108, // FX_PAN_AMT
	  5, // FX_PAN_FREQ
	  16, // FX_DELAY_AMT
	  4 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	  // Columns
	  c: [
		{n: [116,116,116,116,,,,,116,116,116,116,,,,,116,116,116,116,,,,,116,116,116,116],
		 f: []}
	  ]
	},
	{ // Instrument 6
	  i: [
	  2, // OSC1_WAVEFORM
	  100, // OSC1_VOL
	  128, // OSC1_SEMI
	  0, // OSC1_XENV
	  3, // OSC2_WAVEFORM
	  201, // OSC2_VOL
	  128, // OSC2_SEMI
	  0, // OSC2_DETUNE
	  0, // OSC2_XENV
	  0, // NOISE_VOL
	  5, // ENV_ATTACK
	  6, // ENV_SUSTAIN
	  58, // ENV_RELEASE
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
	  p: [],
	  // Columns
	  c: [
	  ]
	},
	{ // Instrument 7
	  i: [
	  3, // OSC1_WAVEFORM
	  255, // OSC1_VOL
	  128, // OSC1_SEMI
	  0, // OSC1_XENV
	  0, // OSC2_WAVEFORM
	  255, // OSC2_VOL
	  140, // OSC2_SEMI
	  0, // OSC2_DETUNE
	  0, // OSC2_XENV
	  127, // NOISE_VOL
	  2, // ENV_ATTACK
	  2, // ENV_SUSTAIN
	  23, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  96, // LFO_AMT
	  3, // LFO_FREQ
	  1, // LFO_FX_FREQ
	  3, // FX_FILTER
	  94, // FX_FREQ
	  79, // FX_RESONANCE
	  0, // FX_DIST
	  32, // FX_DRIVE
	  84, // FX_PAN_AMT
	  2, // FX_PAN_FREQ
	  12, // FX_DELAY_AMT
	  4 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [,,,,1,,,2,2,,,,,1,2,1,2,3,4,1,1,2,2],
	  // Columns
	  c: [
		{n: [,,142,,142,,139,142,,139,142,,135,,133,,,,142,,142,,139,142,,139,142,,135,,133],
		 f: []},
		{n: [,,140,,140,,137,140,,137,140,,133,,,,,,140,,140,,137,140,,137,140,,133],
		 f: []},
		{n: [140,140,140,,,,139,,142,142,142,,,,,,144,144,144,,,,,,142,,139,,136,,134],
		 f: []},
		{n: [],
		 f: []}
	  ]
	},
	{ // Instrument 8
	  i: [
	  0, // OSC1_WAVEFORM
	  91, // OSC1_VOL
	  128, // OSC1_SEMI
	  0, // OSC1_XENV
	  0, // OSC2_WAVEFORM
	  95, // OSC2_VOL
	  128, // OSC2_SEMI
	  12, // OSC2_DETUNE
	  0, // OSC2_XENV
	  0, // NOISE_VOL
	  12, // ENV_ATTACK
	  0, // ENV_SUSTAIN
	  72, // ENV_RELEASE
	  0, // ARP_CHORD
	  0, // ARP_SPEED
	  0, // LFO_WAVEFORM
	  0, // LFO_AMT
	  0, // LFO_FREQ
	  0, // LFO_FX_FREQ
	  2, // FX_FILTER
	  255, // FX_FREQ
	  0, // FX_RESONANCE
	  0, // FX_DIST
	  32, // FX_DRIVE
	  83, // FX_PAN_AMT
	  3, // FX_PAN_FREQ
	  130, // FX_DELAY_AMT
	  4 // FX_DELAY_TIME
	  ],
	  // Patterns
	  p: [1,2,1,2,,,,,,,,,,1,2,1,2,3,4],
	  // Columns
	  c: [
		{n: [152,,,,,,,,,,,,156,,,,149,,,,,,,,,,,,147,,,,156,,,,,,,,,,,,159,,,,152,,,,,,,,,,,,151],
		 f: []},
		{n: [152,,,,,,,,151,,,,149,,,,149,,,,,,,,147,,,,,,,,149,,,,,,,,154,,,,152,,,,152,,,,,,,,151],
		 f: []},
		{n: [147,,,,147,,149,,,,,,,,151,152,151,,,,147,,149,,,,,,,,147,,151,,,,,,152,,,,,,,,,,154,,,,,,152],
		 f: []},
		{n: [147,,,,147,,149,,,,,,,,151,152,151,,,,,,156,152,151,,,,149,,147,,151,,,,,,152,,,,,,,,,,154],
		 f: []}
	  ]
	},
  ],
  rowLen: 7350,   // In sample lengths
  patternLen: 32,  // Rows per pattern
  endPattern: 22,  // End pattern
  numChannels: 9  // Number of channels
}, 1);
