const Textview = (size, pos, font, c) => {
  const draw = (str) => {
    fill(c);
    textFont(font);
    textSize(size);
    textAlign(CENTER);
    text(str, pos.x, pos.y);
  }

  return {
    draw,
  };
}