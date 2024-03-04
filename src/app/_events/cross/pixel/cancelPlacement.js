export const cancelPlacement = function () {
  this.selectedPixel.element?.destroy();
  this.lastFill.element?.destroy();

  if (this.selectedPixel.element) {
    if (this.lastTween && this.lastTween.isPlaying()) {
      this.lastTween.pause();
      this.lastTween = null;
    }

    this.selectedPixel = { row: null, col: null, element: null, color: null };
  }

  if (this.isFillingMode) {
    this.lastFill = {
      element: null,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    };
  }

  document.querySelector("#colorContainer").classList.remove("hidden");
  document.querySelector("#colorContainer").classList.add("flex");
  document.querySelector("#confirmContainer").classList.add("hidden");
  document.querySelector("#confirmContainer").classList.remove("flex");
  document.querySelector("#confirmContainer").style.height = "";
};
