import { PlacementSeconds } from "@/app/_utils/constants";

export const confirmPlacement = function () {
  if (this.canPlacePixel) {
    this.sound.add("place-pixel").play();

    // this.selectedPixel.element.setAlpha(1);
    this.selectedPixel.element.setStrokeStyle(0);
    this.canPlacePixel = false;
    this.selectedPixel = { element: null, color: null };

    document.querySelector("#confirmContainer").classList.add("hidden");
    document.querySelector("#confirmContainer").classList.remove("flex");
    document.querySelector("#breakContainer").classList.remove("hidden");
    document.querySelector("#breakContainer").classList.add("flex");
    document.querySelector("#backdrop").classList.remove("hidden");
    document.querySelector("#backdrop").classList.add("flex");

    let intervalId = null;
    intervalId = setInterval(() => {
      document.querySelector("#secondsLeft").textContent =
        parseInt(document.querySelector("#secondsLeft").textContent) - 1;
      if (parseInt(document.querySelector("#secondsLeft").textContent) <= 0) {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    }, 1000);

    setTimeout(() => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }

      this.sound.add("can-modify").play();
      this.canPlacePixel = true;
      document.querySelector("#breakContainer").classList.add("hidden");
      document.querySelector("#breakContainer").classList.remove("flex");
      document.querySelector("#backdrop").classList.remove("flex");
      document.querySelector("#backdrop").classList.add("hidden");
      document.querySelector("#colorContainer").classList.remove("hidden");
      document.querySelector("#colorContainer").classList.add("flex");
      document.querySelector("#secondsLeft").textContent = PlacementSeconds;
    }, PlacementSeconds * 1000);
  }
};
