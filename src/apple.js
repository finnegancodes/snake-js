const Apple = (blockWidth, gridSize) => {
  const APPLE_COLOR = color("#f7a400");

  let pos = { x: 0, y: 0 };

  const draw = () => {
    fill(APPLE_COLOR);
    const { x, y } = { x: (pos.x + 1) * blockWidth, y: (pos.y + 1) * blockWidth };
    rect(x, y, blockWidth, blockWidth);
  }

  const updatePosition = () => {
    const rand = getRandomPostition();
    pos.x = rand.x;
    pos.y = rand.y;
  }

  const getRandomPostition = () => {
    const x = Math.floor(Math.random() * (gridSize - 2));
    const y = Math.floor(Math.random() * (gridSize - 2));
    return { x, y };
  }

  const getPos = () => pos;

  return {
    draw,
    updatePosition,
    getPos,
  }
}