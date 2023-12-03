import { pointerOut } from "../_events/cross/pixel/pointerOut";
import { pointerOver } from "../_events/cross/pixel/pointerOver";
import { pointerPlacePixel } from "../_events/cross/pixel/pointerPlacePixel";
import { getBoard } from "../_socket/getBoard";
import { CanvasHeight, CanvasWidth, PixelSize } from "./constants";

export const initialDraw = function () {
  getBoard().then((data) => {
    for (const pixelData of data) {
      const pixel = this.add.rectangle(
        pixelData.x * PixelSize,
        pixelData.y * PixelSize,
        PixelSize,
        PixelSize,
        parseInt(pixelData.color, 16)
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
  });

  this.cameras.main.zoom = Math.min(
    (this.game.config.width - 30) / CanvasWidth,
    (this.game.config.height - 30) / CanvasHeight
  );
  this.cameras.main.centerOn(CanvasWidth / 2, CanvasHeight / 2);
};
