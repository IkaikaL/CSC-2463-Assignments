let playfield, fallingPiece, paused;
let port;
let writer, reader;
let input = false;
const width = 10;
const height = 20;

const GameState = {
	Playing: "Playing",
	GameOver: "GameOver",
};
let game = {
	score: 0,
	totalTime: 60,
	state: GameState.Playing,
};

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
	switch (game.state) {
		case GameState.Playing:
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

			playfield.clearLines();

			background(250);

			playfield.show();

			fallingPiece.show();
			if (game.totalTime < 0) {
				playfield.hasLost();
			}
			textSize(30);
			fill(0, 0, 0);
			text("Time: ", 50, 30);
			game.totalTime -= deltaTime / 1000;
			text(ceil(game.totalTime) + " (s)", 150, 30);
			break;

		case GameState.GameOver:
			game.maxScore = max(game.score, game.maxScore);
			background(0);
			fill(255);
			textSize(20);
			textAlign(CENTER);
			text("Game Over!", 150, 200);
			text("Score: " + game.score, 150, 250);
			break;
	}
}

function spawnNewPiece() {
	if (fallingPiece) {
		playfield.addToGrid(fallingPiece);
	}

	const pieces = ["O", "J", "L", "S", "Z", "T", "I"];
	const choice = random(pieces);
	fallingPiece = new Piece(choice, playfield);

	redraw();
	game.score++;
}

function hardDrop(piece, playfield) {
	while (playfield.isValid(piece)) {
		piece.moveDown();
	}

	piece.moveUp();
}

async function serialRead() {
	while (true) {
		const { value, done } = await reader.read();
		if (done) {
			reader.releaseLock();
			break;
		}
		console.log(value);
		switch (game.state) {
			case GameState.Playing:
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

				break;

			case GameState.GameOver:
				if (value == 1) {
					reset();
				}
				break;
		}
	}
}
function reset() {
	game.totalTime = 60;
	game.score = 0;
	game.state = GameState.Playing;
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
