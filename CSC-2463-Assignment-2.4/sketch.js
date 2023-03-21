let sounds = new Tone.Players({
	idle: "sounds/loadingScreen.mp3",
	squish: "sounds/squish.mp3",
	miss: "sounds/miss.mp3",
	ending: "sounds/ending.mp3",
});

let bugSprite, idle, squish, miss, ending, test;
let animations = [];
const GameState = {
	Start: "Start",
	Playing: "Playing",
	GameOver: "GameOver",
};

let game = {
	score: 0,
	maxScore: 0,
	maxTime: 20,
	elapsedTime: 0,
	totalBugs: 15,
	state: GameState.Start,
};

function preload() {
	bugSprite = loadImage("BugSprite.png");
}

function setup() {
	createCanvas(400, 480);
	sounds.toDestination();
	imageMode(CENTER);
	angleMode(DEGREES);
	reset();
}

function reset() {
	game.elapsedTime = 0;
	game.score = 0;
	game.totalBugs = random(10, 30);
	animations = [];
	for (let i = 0; i < game.totalBugs; i++) {
		animations[i] = new SpriteAnimation(
			bugSprite,
			32,
			32,
			random(0, 400),
			random(0, 480),
			3,
			random(1, 3),
			random([0, 1])
		);
	}
}

function draw() {
	switch (game.state) {
		case GameState.Playing:
			background(220);
			for (let i = 0; i < animations.length; i++) {
				animations[i].draw();
			}
			textSize(20);
			text(game.score, 20, 30);
			let currentTime = game.maxTime - game.elapsedTime;
			text(ceil(currentTime), 300, 40);
			game.elapsedTime += deltaTime / 1000;

			if (currentTime < 0) {
				game.state = GameState.GameOver;
				sounds.player("idle").stop();
				sounds.player("ending").start();
			}
			break;

		case GameState.GameOver:
			game.maxScore = max(game.score, game.maxScore);
			background(0);
			fill(255);
			textSize(20);
			textAlign(CENTER);
			text("Game Over!", 200, 200);
			text("Score: " + game.score, 200, 250);
			text("Max Score: " + game.maxScore, 200, 300);
			break;

		case GameState.Start:
			background(0);
			fill(255);
			textSize(20);
			text(CENTER);
			text("Bug Squisher", 125, 200);
			text("Press any key to start", 100, 300);
			break;
	}
}

function mousePressed() {
	switch (game.state) {
		case GameState.Playing:
			for (let i = 0; i < animations.length; i++) {
				let contains = animations[i].contains(mouseX, mouseY);
				if (contains) {
					sounds.player("squish").start();
					if (animations[i].moving != 0) {
						animations[i].stop();
						game.score += 1;
					}
				}
			}
			break;

		case GameState.GameOver:
			reset();
			game.state = GameState.Start;
			break;
	}
}

function keyPressed() {
	switch (game.state) {
		case GameState.Start:
			game.state = GameState.Playing;
			console.log("game start");
			sounds.player("idle").start();
			break;

		case GameState.GameOver:
			reset();
			game.state = GameState.Playing;
			console.log("game over");
			sounds.player("idle").start();
			break;
	}
}

class SpriteAnimation {
	constructor(sheet, width, height, x, y, length, speed, vertical) {
		this.sheet = sheet;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.u = 0;
		this.v = 0;
		this.length = length;
		this.currentFrame = 0;
		this.moving = 1;
		this.xDirection = 1;
		this.speed = speed;
		this.vertical = vertical;
	}

	draw() {
		this.u = this.moving != 0 ? this.currentFrame % this.length : this.u;
		push();
		translate(this.x, this.y);
		scale(this.xDirection, 1);
		if (this.vertical == 0) {
			rotate(90);
			scale(this.xDirection, 1);
		}

		image(
			this.sheet,
			0,
			0,
			this.width,
			this.height,
			this.u * this.width,
			this.v * this.height,
			this.width,
			this.height
		);
		pop();
		if (frameCount % 6 == 0) {
			this.currentFrame++;
		}
		if (this.vertical) {
			this.y += this.moving * this.speed;
			this.move(this.y, this.width / 4, height - this.width / 4);
		} else {
			this.x += this.moving * this.speed;
			this.move(this.x, this.width / 4, width - this.width / 4);
		}
	}

	move(position, lowerBounds, upperBounds) {
		if (position > upperBounds) {
			this.moveLeft();
		} else if (position < lowerBounds) {
			this.moveRight();
		}
	}

	moveRight() {
		this.xDirection = 1;
		this.moving = 1;
		this.v = 0;
	}

	moveLeft() {
		this.xDirection = -1;
		this.moving = -1;
		this.v = 0;
	}

	contains(x, y) {
		let insideX = x > this.x - this.width / 2 && x <= this.x + this.width / 2;
		let insideY =
			y >= this.y - this.height / 2 && y <= this.y + this.height / 2;
		return insideX && insideY;
	}

	stop() {
		this.moving = 0;
		this.u = 3;
		this.v = 0;
	}
}
