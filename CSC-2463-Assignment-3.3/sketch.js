let port;
let writer, reader;
let ledOn = false;
let backgroundColor = 220;

function setup() {
	createCanvas(400, 400);
	let button = createButton("connect");
	button.position(0, 0);
	button.mousePressed(connect);

	if ("serial" in navigator) {
	}
}

function draw() {
	background(backgroundColor);
	if (reader) {
		serialRead();
	}
	if (writer) {
		writer.write(new Uint8Array([ledOn]));
	}
}

async function serialRead() {
	while (true) {
		const { value, done } = await reader.read();
		if (done) {
			reader.releaseLock();
			break;
		}
		if (value == 1) {
			if (backgroundColor == "red") {
				backgroundColor = "black";
			} else {
				backgroundColor = "red";
			}
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

function mousePressed() {
	ledOn = !ledOn;
	console.log(ledOn);
}
