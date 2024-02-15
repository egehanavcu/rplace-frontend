import { pointerPlacePixel } from "../_events/cross/pixel/pointerPlacePixel";
import { getBoard } from "../_socket/getBoard";
import { CanvasHeight, CanvasWidth, DEBUG_MODE, PixelSize } from "./constants";
import {
  addPixelShadow,
  destroyPixelShadow,
  resetPixelShadow,
} from "./pixelShadow";

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

  getBoard().then((receivedData) => {
    const { data, success } = receivedData;
    if (success) {
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

      this.isLoading = false;
      document.querySelector("#loading").classList.add("hidden");
      document.querySelector("body").style.backgroundColor = "#343334";
    }
  });

  if (DEBUG_MODE) {
    document.querySelector("#fpsCounterContainer").classList.remove("hidden");
    document.querySelector("#fpsCounterContainer").classList.add("flex");
  }

  this.input.on("pointerup", (pointer) => {
    const mouseRow = Math.floor(pointer.worldX / PixelSize);
    const mouseCol = Math.floor(pointer.worldY / PixelSize);
    if (pixelIsInBorders(mouseRow, mouseCol) && !this.isLoading) {
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
    if (!pointer.isDown && !this.isLoading) {
      const mouseRow = Math.floor(pointer.worldX / PixelSize);
      const mouseCol = Math.floor(pointer.worldY / PixelSize);

      if (
        this.lastMousePixel.row != mouseRow ||
        this.lastMousePixel.col != mouseCol
      ) {
        destroyPixelShadow.bind(this)();
        if (pixelIsInBorders(mouseRow, mouseCol)) {
          // console.log("Moved on grid:", mouseRow, mouseCol);
          document.querySelector(
            "#coordinates"
          ).textContent = `(${mouseRow},${mouseCol})`;

          addPixelShadow.bind(this)(mouseRow, mouseCol);
        } else {
          resetPixelShadow.bind(this)();
        }
      }
    }
  });

  this.cameras.main.zoom = minZoom;

  const URLParams = getURLParameters();
  if (pixelIsInBorders(+URLParams.x, +URLParams.y)) {
    document.querySelector(
      "#coordinates"
    ).textContent = `(${URLParams.x},${URLParams.y})`;

    if (this.sys.game.device.os.desktop) {
      addPixelShadow.bind(this)(+URLParams.x, +URLParams.y);
    }

    this.cameras.main.centerOn(
      +URLParams.x * PixelSize + PixelSize / 2,
      +URLParams.y * PixelSize + PixelSize / 2
    );
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1.5,
      duration: 800 * Math.abs(3 - this.cameras.main.zoom),
      ease: "sine.inout",
      repeat: 0,
    });
  } else {
    document.querySelector("#coordinates").textContent = "(0,0)";
    this.cameras.main.centerOn(CanvasWidth / 2, CanvasHeight / 2);
  }
};

const getURLParameters = () => {
  var urlParams = new URLSearchParams(window.location.search);
  var params = {};

  for (const [key, value] of urlParams) {
    params[key] = value;
  }

  return params;
};

const pixelIsInBorders = (row, col) => {
  return (
    row >= 0 &&
    row <= CanvasWidth / PixelSize - 1 &&
    col >= 0 &&
    col <= CanvasHeight / PixelSize - 1
  );
};
