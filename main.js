let game;
let waitTime = 0;
let moveInterval = 0.15;
let silkscreen;

function preload() {
  silkscreen = loadFont("assets/Silkscreen-Regular.ttf");
}

function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent("canvas-holder");
  strokeWeight(0);
  game = Game(silkscreen);
}

function draw() {
  clear();
  waitTime += deltaTime / 1000;
  if (waitTime >= moveInterval) {
    game.update();
    waitTime = 0;
  }
  game.draw();
}

function keyPressed() {
  game.keyDown(keyCode);
}