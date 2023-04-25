let playfield, fallingPiece, ghostPiece, paused;
let ghostMode = true;
let port;
let writer, reader;
let input = false;
const width = 10;
const height = 22;

function setup() {
	playfield = new playField(width, height);

	let totalWidth = playfield.cellSize * width + playfield.borderSize * 2;
	let totalHeight = playfield.cellSize * height + playfield.borderSize * 2;

	createCanvas(totalWidth, totalHeight);

	spawnNewPiece();

	let button = createButton("connect");
	button.position(0, 0);
	button.mousePressed(connect);
	if ("serial" in navigator) {
	}
}

let prev = 0;
function draw() {
	if (reader) {
		serialRead();
	}
	if (writer) {
		writer.write(new Uint8Array([input]));
	}

	let curr = millis();
	let delta = curr - prev;
	prev = curr;

	if (!paused) fallingPiece.update(delta);

	if (fallingPiece.timeToFall()) {
		fallingPiece.resetBuffer();
		fallingPiece.moveDown();

		if (!playfield.isValid(fallingPiece)) {
			fallingPiece.moveUp();
			spawnNewPiece();
		}
	}

	ghostPiece.copy(fallingPiece);
	hardDrop(ghostPiece, playfield);

	playfield.clearLines();

	background(251);

	playfield.show();
	if (ghostMode) ghostPiece.show();
	fallingPiece.show();
}

function spawnNewPiece() {
	if (fallingPiece) {
		playfield.addToGrid(fallingPiece);
	}

	const pieces = ["O", "J", "L", "S", "Z", "T", "I"];
	const choice = random(pieces);
	fallingPiece = new Piece(choice, playfield);

	ghostPiece = new Piece(choice, playfield);
	ghostPiece.isghost = true;
	ghostPiece.cells = fallingPiece.cells;

	redraw();
}

function hardDrop(piece, playfield) {
	while (playfield.isValid(piece)) {
		piece.moveDown();
	}

	piece.moveUp();
}

function toggleGhost() {
	ghostMode = !ghostMode;
}

async function serialRead() {
	while (true) {
		const { value, done } = await reader.read();
		if (done) {
			reader.releaseLock();
			break;
		}
		console.log(value == 5);
		console.log(typeof value);

		if (value == 1) {
			fallingPiece.rotateCCW();
			if (!playfield.isValid(fallingPiece)) fallingPiece.rotateCW();
			break;
		} else if (value == 5) {
			hardDrop(fallingPiece, playfield);
			spawnNewPiece();
			break;
		} else if (value == 2) {
			fallingPiece.moveLeft();
			if (!playfield.isValid(fallingPiece)) fallingPiece.moveRight();
			break;
		} else if (value == 3) {
			fallingPiece.moveRight();
			if (!playfield.isValid(fallingPiece)) fallingPiece.moveLeft();
			break;
		}
		console.log(value);
	}
}

async function connect() {
	port = await navigator.serial.requestPort();

	await port.open({ baudRate: 9600 });

	writer = port.writable.getWriter();

	reader = port.readable
		.pipeThrough(new TextDecoderStream())
		.pipeThrough(new TransformStream(new LineBreakTransformer()))
		.getReader();
}

class LineBreakTransformer {
	constructor() {
		this.chunks = "";
	}
	transform(chunk, controller) {
		this.chunks += chunk;
		const lines = this.chunks.split("\n");
		this.chunks = lines.pop();
		lines.forEach((line) => controller.enqueue(line));
	}
	flush(controller) {
		controller.enqueue(this.chunks);
	}
}
