let sounds = new Tone.Players({
  'soundOne' :'media/aggressive-huge-hit-logo-139134.mp3',
  'soundTwo' : 'media/ah-yeah-scratch-things-w-eko-2-103978.mp3',
  'soundThree' : 'media/typical-trap-loop-2b-130751.mp3',
  'soundFour' : 'media/typical-trap-loop-140bpm-129880.mp3'
});

let firstSongButton;
let secondSongButton;
let thirdSongButton;
let fourthSongButton;
let playbackUp;
let playbackDown;
let resetSpeed;

function setup() {
  createCanvas(400, 400);
  sounds.toDestination();

  firstSongButton = createButton('First Sound');
  firstSongButton.position(5,100);
  firstSongButton.mousePressed(playFirstSound);

  secondSongButton = createButton('Second Sound');
  secondSongButton.position(100,100);
  secondSongButton.mousePressed(playSecondSound);

  thirdSongButton = createButton('Third Sound');
  thirdSongButton.position(205,100);
  thirdSongButton.mousePressed(playThirdSound);

  fourthSongButton = createButton('Fourth Sound');
  fourthSongButton.position(305,100);
  fourthSongButton.mousePressed(playFourthSound);

  playbackUp = createButton('Speed Up');
  playbackUp.position(100,300);
  playbackUp.mousePressed(increasePlaybackRate);

  playbackDown = createButton('Slow Down');
  playbackDown.position(205,300);
  playbackDown.mousePressed(decreasePlaybackRate);

  resetSpeed = createButton('Reset');
  resetSpeed.position(165,350);
  resetSpeed.mousePressed(resetSpeedFunction);
}

function draw() {
  background(220);
  textSize(20);
  text('Click the buttons to play the sounds', 50, 50, 400, 400)
}

function playFirstSound(){
  sounds.player('soundOne').start();
}
function playSecondSound(){
  sounds.player('soundTwo').start();
}
function playThirdSound(){
  sounds.player('soundThree').start();
}
function playFourthSound(){
  sounds.player('soundFour').start();
}

function increasePlaybackRate() {
  sounds.player('soundOne').playbackRate += .1;
  sounds.player('soundTwo').playbackRate += .1;
  sounds.player('soundThree').playbackRate += .1;
  sounds.player('soundFour').playbackRate += .1;
}

function decreasePlaybackRate() {
  sounds.player('soundOne').playbackRate -= .1;
  sounds.player('soundTwo').playbackRate -= .1;
  sounds.player('soundThree').playbackRate -= .1;
  sounds.player('soundFour').playbackRate -= .1;
}

function resetSpeedFunction() {
  sounds.player('soundOne').playbackRate = 1;
  sounds.player('soundTwo').playbackRate = 1;
  sounds.player('soundThree').playbackRate = 1;
  sounds.player('soundFour').playbackRate = 1;
}