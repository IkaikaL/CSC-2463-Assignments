class Piece {
	constructor(type, playfield, x, y) {
		this.type = type;
		this.cells = types[type];
		this.size = this.cells.length;

		this.cellSize = playfield.cellSize;
		this.offset = playfield.borderSize;

		this.x = x === undefined ? floor((playfield.cols - this.size) / 2) : x;
		this.y = y || 0;

		this.dropInterval = 1000;
		this.dropBuffer = 0;

		this.isghost = false;
	}

	update(time) {
		this.dropBuffer += time;
	}

	timeToFall() {
		return this.dropBuffer > this.dropInterval;
	}

	resetBuffer() {
		this.dropBuffer = 0;
	}

	copy(piece) {
		this.x = piece.x;
		this.y = piece.y;
		this.cells = piece.cells;
	}

	show() {
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				if (this.cells[row][col]) {
					let x = this.x + col;
					let y = this.y + row;

					let cs = this.cellSize;
					let off = this.offset;

					fill(this.isghost ? "#bbb" : this.cells[row][col]);
					rect(off + cs * x, off + cs * y, cs - 1, cs - 1);
				}
			}
		}
	}

	moveDown() {
		this.y++;
	}
	moveRight() {
		this.x++;
	}
	moveLeft() {
		this.x--;
	}
	moveUp() {
		this.y--;
	}

	rotateCW() {
		let newCells = [];

		for (let col = 0; col < this.size; col++) {
			let newRow = [];
			for (let row = this.size - 1; row >= 0; row--) {
				newRow.push(this.cells[row][col]);
			}
			newCells.push(newRow);
		}
		this.cells = newCells;
	}

	rotateCCW() {
		let newCells = [];
		for (let col = this.size - 1; col >= 0; col--) {
			let newRow = [];
			for (let row = 0; row < this.size; row++) {
				newRow.push(this.cells[row][col]);
			}
			newCells.push(newRow);
		}
		this.cells = newCells;
	}
}

let types = {
	O: [
		["#f43", "#f43"],
		["#f43", "#f43"],
	],

	J: [
		["#f43", null, null],
		["#f43", "#f43", "#f43"],
		[null, null, null],
	],

	L: [
		[null, null, "#f43"],
		["#f43", "#f43", "#f43"],
		[null, null, null],
	],

	S: [
		[null, "#f43", "#f43"],
		["#f43", "#f43", null],
		[null, null, null],
	],

	Z: [
		["#f43", "#f43", null],
		[null, "#f43", "#f43"],
		[null, null, null],
	],

	T: [
		[null, "#f43", null],
		["#f43", "#f43", "#f43"],
		[null, null, null],
	],

	I: [
		[null, null, null, null],
		["#f43", "#f43", "#f43", "#f43"],
		[null, null, null, null],
		[null, null, null, null],
	],
};
