export const pointerOut = function (pixel) {
  this.input.setDefaultCursor("default");
  if (pixel.strokeColor !== 0x050505) {
    pixel.setStrokeStyle(0);
  }
};
