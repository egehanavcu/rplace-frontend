import { COLORS, PixelSize } from "./constants";

export const createBatchPixels = function () {
  for (const COLOR of COLORS) {
    this.batchPixels[COLOR] = new Phaser.GameObjects.Rectangle(
      this,
      0,
      0,
      PixelSize,
      PixelSize,
      COLOR
    );
  }
};
