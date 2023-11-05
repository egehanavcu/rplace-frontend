import { pointerOut } from "../_events/cross/pixel/pointerOut";
import { pointerOver } from "../_events/cross/pixel/pointerOver";
import { pointerPlacePixel } from "../_events/cross/pixel/pointerPlacePixel";
import { CanvasHeight, CanvasWidth, PixelSize } from "./constants";

export const initialDraw = function () {
  for (let x = 0; x < CanvasWidth / PixelSize; x++) {
    for (let y = 0; y < CanvasHeight / PixelSize; y++) {
      const pixel = this.add.rectangle(
        x * PixelSize,
        y * PixelSize,
        PixelSize,
        PixelSize,
        0xffffff
      );
      pixel.setOrigin(0, 0);
      pixel.setInteractive();

      pixel.on("pointerover", () => {
        pointerOver.bind(this)(pixel);
      });

      pixel.on("pointerout", () => {
        pointerOut.bind(this)(pixel);
      });

      pixel.on("pointerup", (pointer) => {
        if (pointer.getDistance() > 20) {
          return;
        }

        pointerPlacePixel.bind(this)(pixel);
      });
    }
  }

  this.cameras.main.zoom = Math.min(
    (this.game.config.width - 30) / CanvasWidth,
    (this.game.config.height - 30) / CanvasHeight
  );
  this.cameras.main.centerOn(CanvasWidth / 2, CanvasHeight / 2);
};
