export const pointerOver = function (pixel) {
  this.input.setDefaultCursor("pointer");
  if (pixel.strokeColor !== 0x050505) {
    pixel.setStrokeStyle(1, 0x000000);
  }
};
