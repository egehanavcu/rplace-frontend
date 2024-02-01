import { pointerPlacePixel } from "../_events/cross/pixel/pointerPlacePixel";
import { getBoard } from "../_socket/getBoard";
import { COLORS, CanvasHeight, CanvasWidth, PixelSize } from "./constants";

export const initialDraw = function () {
  this.renderTexture = this.add.renderTexture(
    CanvasWidth / 2,
    CanvasHeight / 2,
    CanvasWidth,
    CanvasHeight
  );

  const minZoom = Math.min(
    (this.game.config.width - 30) / CanvasWidth,
    (this.game.config.height - 30) / CanvasHeight
  );

  const pixels = {};

  getBoard().then((data) => {
    for (const COLOR of COLORS) {
      pixels[COLOR] = new Phaser.GameObjects.Rectangle(
        this,
        0,
        0,
        PixelSize,
        PixelSize,
        COLOR
      );
    }

    this.renderTexture.beginDraw();
    for (const [index, color] of data.entries()) {
      const row = Math.floor(index / (CanvasWidth / PixelSize));
      const column = index % (CanvasHeight / PixelSize);
      this.renderTexture.batchDraw(
        pixels[parseInt(color, 16)],
        row * PixelSize + PixelSize / 2,
        column * PixelSize + PixelSize / 2
      );
    }
    this.renderTexture.endDraw();
    document.querySelector("#loading").classList.add("hidden");
  });

  this.input.on("pointerup", (pointer) => {
    const mouseRow = Math.floor(pointer.worldX / PixelSize);
    const mouseCol = Math.floor(pointer.worldY / PixelSize);
    if (
      mouseRow >= 0 &&
      mouseRow <= CanvasWidth / PixelSize - 1 &&
      mouseCol >= 0 &&
      mouseCol <= CanvasHeight / PixelSize - 1
    ) {
      if (pointer.getDistance() <= 20) {
        // console.log("Clicked on grid:", mouseRow, mouseCol);
        if (
          this.cameras.main.zoom >= minZoom &&
          this.cameras.main.zoom <= 5 * minZoom
        ) {
          this.cameras.main.centerOn(
            mouseRow * PixelSize + PixelSize / 2,
            mouseCol * PixelSize + PixelSize / 2
          );

          this.lastTween = this.tweens.add({
            targets: this.cameras.main,
            zoom: 1.5,
            duration: 800 * Math.abs(3 - this.cameras.main.zoom),
            ease: "sine.inout",
            repeat: 0,
          });
        }

        pointerPlacePixel.bind(this)(mouseRow, mouseCol);
      }
    }
  });

  this.input.on("pointermove", (pointer) => {
    if (!pointer.isDown) {
      const mouseRow = Math.floor(pointer.worldX / PixelSize);
      const mouseCol = Math.floor(pointer.worldY / PixelSize);

      if (
        this.lastMousePixel.row != mouseRow ||
        this.lastMousePixel.col != mouseCol
      ) {
        if (this.lastMousePixel.shadow) {
          this.lastMousePixel.shadow.destroy();
        }

        if (
          mouseRow >= 0 &&
          mouseRow <= CanvasWidth / PixelSize - 1 &&
          mouseCol >= 0 &&
          mouseCol <= CanvasHeight / PixelSize - 1
        ) {
          // console.log("Moved on grid:", mouseRow, mouseCol);
          this.lastMousePixel.row = mouseRow;
          this.lastMousePixel.col = mouseCol;
          this.lastMousePixel.shadow = this.add.rectangle(
            mouseRow * PixelSize + PixelSize / 2,
            mouseCol * PixelSize + PixelSize / 2,
            PixelSize,
            PixelSize,
            0x000000,
            0
          );
          this.lastMousePixel.shadow.setStrokeStyle(1, 0x000000);
        } else {
          this.lastMousePixel.row = null;
          this.lastMousePixel.col = null;
          this.lastMousePixel.shadow = null;
        }
      }
    }
  });

  this.cameras.main.zoom = minZoom;
  this.cameras.main.centerOn(CanvasWidth / 2, CanvasHeight / 2);
};
