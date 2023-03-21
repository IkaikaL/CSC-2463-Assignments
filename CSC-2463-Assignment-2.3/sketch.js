let synth;
let delay;
let totalTime = 0.5;
let instrument;
let matrixGif;

function preload() {
	matrixGif = createImg("images/matrixGif.gif");
}

function setup() {
	createCanvas(540, 380);
	instrument = createSound();
	synth = instrument.instrument;
	delay = instrument.effect3;
	console.log(delay);
}

function draw() {
	background(255);
	matrixGif.position(0, 0);
	text("click to play sounds", 200, 370);
}

function createSound() {
	let instrument = new Tone.FMSynth();
	let synthJSON = {
		harmonicity: 0.5,
		modulationIndex: 1.2,
		oscillator: {
			type: "fmsawtooth",
			modulationType: "sine",
			modulationIndex: 20,
			harmonicity: 3,
		},
		envelope: {
			attack: 0.05,
			decay: 0.3,
			sustain: 0.1,
			release: 1.2,
		},
		modulation: {
			volume: 0,
			type: "triangle",
		},
		modulationEnvelope: {
			attack: 0.35,
			decay: 0.1,
			sustain: 1,
			release: 0.01,
		},
	};

	instrument.set(synthJSON);

	let effect1, effect3;

	effect1 = new Tone.JCReverb();
	effect1JSON = {
		roomSize: 0.8,
		wet: 0.5,
	};
	effect1.set(effect1JSON);

	effect3 = new Tone.FeedbackDelay();
	effect3JSON = {
		delayTime: "64n",
		feedback: 0.7,
		wet: 0.5,
	};
	effect3.set(effect3JSON);

	instrument.connect(effect1);
	effect1.connect(effect3);
	effect3.connect(Tone.Destination);

	return {
		instrument,
		effect3,
	};
}

function mousePressed() {
	delay.feedback.rampTo(0.99, totalTime);
	synth.frequency.rampTo(40, totalTime);
	synth.modulationIndex.setValueCurveAtTime(
		[10, 40, 20, 4, 3],
		Tone.now(),
		totalTime
	);
	synth.harmonicity.setValueCurveAtTime(
		[3, 4, 5, 10, 20],
		Tone.now(),
		totalTime
	);
	synth.triggerAttackRelease("c4", totalTime);
}
