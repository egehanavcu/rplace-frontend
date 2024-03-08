import { sendFill } from "@/app/_requests/sendFill";
import { sendPixel } from "@/app/_requests/sendPixel";
import { PlacementSeconds } from "@/app/_utils/constants";

export const confirmPlacement = function () {
  if (this.canPlacePixel) {
    const row = this.selectedPixel.row;
    const col = this.selectedPixel.col;
    const color = this.color;

    if (this.isFillingMode) {
      sendFill(
        this.lastFill.startX,
        this.lastFill.startY,
        this.lastFill.endX,
        this.lastFill.endY,
        this.color
      ).then((data) => {
        this.lastFill = {
          element: null,
          startX: null,
          startY: null,
          endX: null,
          endY: null,
        };
      });

      this.lastFill.element.destroy();
    }

    if (!this.isFillingMode && this.selectedPixel.element) {
      sendPixel
        .bind(this)(row, col, color)
        .then((data) => {});

      this.selectedPixel.element.destroy();
    }

    this.canPlacePixel = false;
    this.selectedPixel = {
      row: null,
      col: null,
      element: null,
      color: null,
    };

    this.sound.add("place-pixel", { mute: this.isMuted }).play();

    const confirmContainerHeight =
      document.querySelector("#confirmContainer").clientHeight;

    document.querySelector("#confirmContainer").classList.add("hidden");
    document.querySelector("#confirmContainer").classList.remove("flex");
    document.querySelector("#confirmContainer").style.height = "";
    document.querySelector("#breakContainer").classList.remove("hidden");
    document.querySelector("#breakContainer").classList.add("flex");
    document.querySelector(
      "#breakContainer"
    ).style.height = `${confirmContainerHeight}px`;
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

      this.sound.add("can-modify", { mute: this.isMuted }).play();
      this.canPlacePixel = true;
      document.querySelector("#breakContainer").classList.add("hidden");
      document.querySelector("#breakContainer").classList.remove("flex");
      document.querySelector("#breakContainer").style.height = "";
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
