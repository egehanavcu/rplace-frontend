export const cancelPlacement = function () {
  // this.selectedPixel.element.setAlpha(1);
  this.selectedPixel.element.setStrokeStyle(0);
  this.selectedPixel.element.setFillStyle(this.selectedPixel.color);
  this.selectedPixel = { element: null, color: null };

  document.querySelector("#colorContainer").classList.remove("hidden");
  document.querySelector("#colorContainer").classList.add("flex");
  document.querySelector("#confirmContainer").classList.add("hidden");
  document.querySelector("#confirmContainer").classList.remove("flex");
};
