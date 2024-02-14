import { PixelSize } from "@/app/_utils/constants";

export const pointerPlacePixel = function (row, col) {
  if (!this.canPlacePixel) {
    this.sound.add("cant-modify").play();
    this.cameras.main.shake(300, 0.01 / this.cameras.main.zoom, true);
    return;
  }

  this.sound.add("select-pixel").play();

  if (this.selectedPixel.element) {
    this.selectedPixel.element.destroy();
  }

  this.selectedPixel = {
    row: row,
    col: col,
    color: this.color,
  };

  this.selectedPixel.element = this.add.rectangle(
    row * PixelSize + PixelSize / 2,
    col * PixelSize + PixelSize / 2,
    PixelSize,
    PixelSize,
    this.color,
    1
  );

  this.selectedPixel.element.setFillStyle(this.color);
  this.selectedPixel.element.setStrokeStyle(1, 0x050505);

  const colorsContainerHeight =
    document.querySelector("#colorContainer").clientHeight;

  document.querySelector("#colorContainer").classList.remove("flex");
  document.querySelector("#colorContainer").classList.add("hidden");

  document.querySelector("#confirmContainer").classList.add("flex");
  document.querySelector("#confirmContainer").classList.remove("hidden");

  if (!document.querySelector("#confirmContainer").style.height) {
    document.querySelector(
      "#confirmContainer"
    ).style.height = `${colorsContainerHeight}px`;
  }

  window.history.replaceState({}, "", `?x=${row}&y=${col}`);
};
