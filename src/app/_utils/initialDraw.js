import { pointerPlacePixel } from "../_events/cross/pixel/pointerPlacePixel";
import { getBoard } from "../_socket/getBoard";
import { CanvasHeight, CanvasWidth, DEBUG_MODE, PixelSize } from "./constants";

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

  getBoard().then((data) => {
    this.renderTexture.beginDraw();
    for (const [index, color] of data.entries()) {
      const row = Math.floor(index / (CanvasWidth / PixelSize));
      const column = index % (CanvasHeight / PixelSize);
      this.renderTexture.batchDraw(
        this.batchPixels[parseInt(color, 16)],
        row * PixelSize + PixelSize / 2,
        column * PixelSize + PixelSize / 2
      );
    }
    this.renderTexture.endDraw();

    this.add.image(0, 0, "edge").setOrigin(0, 0.5).setPosition(-120, -50);

    this.add
      .rectangle(
        -1 * PixelSize + PixelSize / 2,
        -1 * PixelSize,
        PixelSize,
        CanvasHeight + 2 * PixelSize,
        0xc6c4c4
      )
      .setOrigin(0.5, 0); // Border Left

    this.add
      .rectangle(
        CanvasWidth + PixelSize / 2,
        -1 * PixelSize,
        PixelSize,
        CanvasHeight + 2 * PixelSize,
        0xc6c4c4
      )
      .setOrigin(0.5, 0); // Border Right

    this.add
      .rectangle(
        0,
        -1 * PixelSize + PixelSize / 2,
        CanvasWidth,
        PixelSize,
        0xc6c4c4
      )
      .setOrigin(0, 0.5); // Border Top

    this.add
      .rectangle(
        0,
        CanvasHeight + PixelSize / 2,
        CanvasWidth,
        PixelSize,
        0xc6c4c4
      )
      .setOrigin(0, 0.5); // Border Bottom

    document.querySelector("#loading").classList.add("hidden");

    if (DEBUG_MODE) {
      document.querySelector("#fpsCounterContainer").classList.remove("hidden");
      document.querySelector("#fpsCounterContainer").classList.add("flex");
    }
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
        document.querySelector(
          "#coordinates"
        ).textContent = `(${mouseRow},${mouseCol})`;
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
          document.querySelector(
            "#coordinates"
          ).textContent = `(${mouseRow},${mouseCol})`;
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
