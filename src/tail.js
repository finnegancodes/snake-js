const Tail = (color, blockWidth) => {
  let body = [
    { x: 3, y: 3 },
    { x: 2, y: 3 },
  ];

  const draw = () => {
    fill(color);
    for (let i = 0; i < body.length; i++) {
      const pos = body[i];
      const { x, y } = { x: (pos.x + 1) * blockWidth, y: (pos.y + 1) * blockWidth };
      rect(x, y, blockWidth, blockWidth);
    }
  };

  const update = (head) => {
    for (let i = body.length - 1; i > 0; i--) {
      body[i].x = body[i - 1].x;
      body[i].y = body[i - 1].y;
    }
    body[0].x = head.x;
    body[0].y = head.y;
  };

  const checkCollision = (head) => {
    for (let i = 0; i < body.length; i++) {
      if (head.x === body[i].x && head.y === body[i].y) {
        return true;
      }
    }

    return false;
  }

  const grow = () => {
    const lastBlock = body[body.length - 1];
    const newBlock = {
      x: lastBlock.x,
      y: lastBlock.y,
    };
    body = [ ...body, newBlock ];
  }

  return {
    draw,
    update,
    checkCollision,
    grow,
  };
};
