import { sendPixel } from "@/app/_socket/sendPixel";
import { PlacementSeconds } from "@/app/_utils/constants";

export const confirmPlacement = function () {
  if (this.canPlacePixel && this.selectedPixel.element) {
    sendPixel.bind(this)();
    this.sound.add("place-pixel").play();

    this.selectedPixel.element.setStrokeStyle(0);
    this.canPlacePixel = false;
    this.selectedPixel = { row: null, col: null, element: null, color: null };

    document.querySelector("#confirmContainer").classList.add("hidden");
    document.querySelector("#confirmContainer").classList.remove("flex");
    document.querySelector("#breakContainer").classList.remove("hidden");
    document.querySelector("#breakContainer").classList.add("flex");
    document.querySelector("#backdrop").classList.remove("hidden");
    document.querySelector("#backdrop").classList.add("flex");

    let intervalId = null;
    intervalId = setInterval(() => {
      document.querySelector("#secondsLeft").textContent = (
        "0" +
        (parseInt(document.querySelector("#secondsLeft").textContent, 10) - 1)
      ).slice(-2);
      if (
        parseInt(document.querySelector("#secondsLeft").textContent, 10) <= 0
      ) {
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
      document.querySelector("#secondsLeft").textContent = (
        "0" + PlacementSeconds
      ).slice(-2);
    }, PlacementSeconds * 1000);
  }
};
