const KeyMap = {
  87: Direction.Up,
  83: Direction.Down,
  65: Direction.Left,
  68: Direction.Right,
};

const Game = (font) => {
  const BG_COLOR = color("#1a1b4b");
  const BORDER_COLOR = color("#292a73");
  const GRID_SIZE = 25;
  const BLOCK_WIDTH = width / GRID_SIZE;

  let score = 0;
  let paused = false;
  let dead = false;
  let firstTime = true;
  let snake = Snake(BLOCK_WIDTH, GRID_SIZE);
  let apple = Apple(BLOCK_WIDTH, GRID_SIZE);
  const scoreText = Textview(26, { x: width / 2, y: BLOCK_WIDTH * 3 }, font, 255);
  const centerText = Textview(22, { x: width / 2, y: height / 2 }, font, 255);
  const tipText = Textview(18, { x: width / 2, y: height / 2 + 30 }, font, 255);

  apple.updatePosition();

  const draw = () => {
    background(BG_COLOR);

    if (!firstTime) {
      apple.draw();
      snake.draw();
      scoreText.draw(score.toString());
    }
    
    drawBorders();

    if (paused) drawPaused();
    if (dead) drawDeath();
    if (firstTime) drawWelcomeScreen();
  };

  const drawBorders = () => {
    fill(BORDER_COLOR);

    rect(0, 0, width, BLOCK_WIDTH);
    rect(0, 0, BLOCK_WIDTH, height);
    rect(0, height - BLOCK_WIDTH, width, BLOCK_WIDTH);
    rect(width - BLOCK_WIDTH, 0, BLOCK_WIDTH, height);
  };

  const drawPaused = () => {
    fill(255, 255, 255, 25);
    rect(0, 0, width, height);
    centerText.draw("Paused");
  };

  const drawDeath = () => {
    fill(255, 0, 0, 50);
    rect(0, 0, width, height);
    centerText.draw("You fucked it");
    tipText.draw("Press [SPACE] to try again");
  }

  const drawWelcomeScreen = () => {
    centerText.draw("Snake.js");
    tipText.draw("Press [SPACE] to play");
  }

  const update = () => {
    if (paused || dead || firstTime) return;
    snake.update();

    const collision = snake.checkCollisions();
    if (collision) die();

    const overlapsApple = snake.checkApple(apple.getPos());
    if (overlapsApple) {
      snake.grow();
      apple.updatePosition();
      score += 1;
    }
  };

  const keyDown = (key) => {
    if (key === 32) {
      if (dead || firstTime) {
        reset();
        dead = false;
        firstTime = false;
        return;
      }
      paused = !paused;
    }
    if (paused) return;

    if (key === 80) {
      apple.updatePosition();
      return;
    }

    const dir = KeyMap[key];
    if (dir == undefined) return;
    snake.setDir(dir);
  };

  const die = () => {
    dead = true;
  }

  const reset = () => {
    snake = Snake(BLOCK_WIDTH, GRID_SIZE);
    apple.updatePosition();
    score = 0;
  };

  return {
    draw,
    update,
    keyDown,
  };
};
