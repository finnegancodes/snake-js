const Direction = {
  Up: { x: 0, y: -1 },
  Down: { x: 0, y: 1 },
  Left: { x: -1, y: 0 },
  Right: { x: 1, y: 0 },
}

const Snake = (blockWidth, gridSize) => {
  const SNAKE_COLOR = color("#3a9efd");

  let pos = { x: 4, y: 3 };
  let vel = { x: 1, y: 0 };
  let tail = Tail(SNAKE_COLOR, blockWidth);
  let dir = Direction.Right;

  const draw = () => {
    fill(SNAKE_COLOR);
    const { x, y } = { x: (pos.x + 1) * blockWidth, y: (pos.y + 1) * blockWidth };
    rect(x, y, blockWidth, blockWidth);
    tail.draw();
  };

  const update = () => {
    if ((vel.x !== -dir.x) && (vel.y !== -dir.y)) {
      vel = dir;
    }

    tail.update(pos);

    pos.x += vel.x;
    pos.y += vel.y;
  };

  const checkCollisions = () => {
    if ((pos.x < 0 || pos.x > gridSize - 3) || (pos.y < 0 || pos.y > gridSize - 3)) {
      return true;
    }
    
    const collidesWithHead = tail.checkCollision(pos);
    if (collidesWithHead) return true;

    return false;
  }

  const checkApple = (apple) => {
    return (pos.x === apple.x && pos.y === apple.y);
  }

  const setDir = (newDir) => {
    dir = newDir;
  }

  const grow = () => {
    tail.grow();
  }

  return {
    draw,
    update,
    setDir,
    checkCollisions,
    checkApple,
    grow,
  };
};
