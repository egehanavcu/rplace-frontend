export const cancelPlacement = function () {
  if (this.selectedPixel.element) {
    if (this.lastTween && this.lastTween.isPlaying()) {
      this.lastTween.pause();
      this.lastTween = null;
    }

    this.selectedPixel.element.destroy();
    this.selectedPixel = { row: null, col: null, element: null, color: null };

    document.querySelector("#colorContainer").classList.remove("hidden");
    document.querySelector("#colorContainer").classList.add("flex");
    document.querySelector("#confirmContainer").classList.add("hidden");
    document.querySelector("#confirmContainer").classList.remove("flex");
    document.querySelector("#confirmContainer").style.height = "";
  }
};
