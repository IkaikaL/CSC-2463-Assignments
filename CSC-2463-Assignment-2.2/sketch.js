const synth = new Tone.DuoSynth();

let notes = {
  'a':'C4',
  's':'D4',
  'd':'E4',
  'f':'F4',
  'g':'G4',
  'h':'A4',
  'j':'B4',
  'k':'C5',
}

let decrease;
let increase;
let reset;

function setup() {
  createCanvas(400, 400);
  synth.toDestination();

  increase = createButton('Increase Octave');
  increase.position(50,300);
  increase.mousePressed(increaseHarmonicity);

  decrease = createButton('Decrease Octave');
  decrease.position(205,300);
  decrease.mousePressed(decreaseHarmonicity);

  reset = createButton('Reset');
  reset.position(165,350);
  reset.mousePressed(resetHarmonicity);
  
}

function draw() {
  background(220);
  textSize(20);
  text('Use a, s, d, f, g, h, j, and k to play sounds', 20, 50, 400, 400)
}

function keyPressed() {
  let selectedNote = notes[key];
  synth.triggerAttackRelease(selectedNote, "8n");
}

function decreaseHarmonicity() {
  synth.harmonicity.value = 0.0;
}

function increaseHarmonicity() {
  synth.harmonicity.value = 2.0;
}

function resetHarmonicity() {
  synth.harmonicity.value = 1.5;
}
