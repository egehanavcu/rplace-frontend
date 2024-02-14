import { PixelSize } from "./constants";

export const addPixelShadow = function (row, col) {
  this.lastMousePixel.row = row;
  this.lastMousePixel.col = col;
  this.lastMousePixel.shadow = this.add.rectangle(
    row * PixelSize + PixelSize / 2,
    col * PixelSize + PixelSize / 2,
    PixelSize,
    PixelSize,
    0x000000,
    0
  );
  this.lastMousePixel.shadow.setStrokeStyle(1, 0x000000);
};

export const destroyPixelShadow = function () {
  if (this.lastMousePixel.shadow) {
    this.lastMousePixel.shadow.destroy();
  }
};

export const resetPixelShadow = function () {
  this.lastMousePixel.row = null;
  this.lastMousePixel.col = null;
  this.lastMousePixel.shadow = null;
};
