export const pointerPlacePixel = function (pixel) {
  if (!this.canPlacePixel) {
    this.sound.add("cant-modify").play();
    this.cameras.main.shake(300, 0.01 / this.cameras.main.zoom, true);
    return;
  }

  this.sound.add("select-pixel").play();
  if (this.selectedPixel.element) {
    this.selectedPixel.element.setFillStyle(this.selectedPixel.color);
    // this.selectedPixel.element.setAlpha(1);
    this.selectedPixel.element.setStrokeStyle(0);
  }

  this.selectedPixel = {
    element: pixel,
    color: pixel.fillColor,
  };

  pixel.setFillStyle(this.color);
  // pixel.setAlpha(0.6);
  pixel.setStrokeStyle(1, 0x050505);

  document.querySelector("#colorContainer").classList.remove("flex");
  document.querySelector("#colorContainer").classList.add("hidden");

  document.querySelector("#confirmContainer").classList.add("flex");
  document.querySelector("#confirmContainer").classList.remove("hidden");
};
