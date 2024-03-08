import { pointerPlacePixel } from "../_events/cross/pixel/pointerPlacePixel";
import { getBoard } from "../_requests/getBoard";
import { CanvasHeight, CanvasWidth, DEBUG_MODE, PixelSize } from "./constants";
import { drawDevelopers } from "./drawDevelopers";
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

  const UIHeight = document.querySelector("#ui").clientHeight;

  const minZoom = Math.min(
    (this.game.config.width - 30) / CanvasWidth,
    (this.game.config.height - 2 * UIHeight - 30 - 45) / CanvasHeight
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
      drawDevelopers.bind(this)();
    }
  });

  if (DEBUG_MODE) {
    document.querySelector("#fpsCounterContainer").classList.remove("hidden");
    document.querySelector("#fpsCounterContainer").classList.add("flex");
  }

  this.input.on("pointerup", (pointer) => {
    const mouseRow = Math.floor(pointer.worldX / PixelSize);
    const mouseCol = Math.floor(pointer.worldY / PixelSize);
    if (
      pixelIsInBorders(mouseRow, mouseCol) &&
      !this.isFillingMode &&
      !this.isLoading
    ) {
      if (pointer.getDistance() <= 20) {
        document.querySelector(
          "#coordinates"
        ).textContent = `(${mouseRow},${mouseCol})`;

        this.lastTween = this.tweens.add({
          targets: this.cameras.main,
          scrollX:
            mouseRow * PixelSize + PixelSize / 2 - this.cameras.main.width / 2,
          scrollY:
            mouseCol * PixelSize + PixelSize / 2 - this.cameras.main.height / 2,
          zoom: this.cameras.main.zoom,
          duration: 600,
          ease: "cubic.out",
          repeat: 0,
        });
        //}

        if (!document.querySelector("#ui").classList.contains("hidden")) {
          pointerPlacePixel.bind(this)(mouseRow, mouseCol);
        }
      }
    } else if (this.isFillingMode && !this.isLoading) {
      this.lastFill.startedFilling = false;
      if (!document.querySelector("#ui").classList.contains("hidden")) {
        pointerPlacePixel.bind(this)(mouseRow, mouseCol);
      }
      return;
    }
  });

  this.input.on("pointermove", (pointer) => {
    if (!this.isLoading) {
      let mouseRow = Math.floor(pointer.worldX / PixelSize);
      let mouseCol = Math.floor(pointer.worldY / PixelSize);

      if (pointer.isDown) {
        mouseRow = Phaser.Math.Clamp(mouseRow, 0, CanvasWidth / PixelSize - 1);
        mouseCol = Phaser.Math.Clamp(mouseCol, 0, CanvasHeight / PixelSize - 1);
        if (this.isFillingMode && this.canPlacePixel) {
          if (this.lastFill.startedFilling) {
            this.lastFill.endX = mouseRow;
            this.lastFill.endY = mouseCol;

            this.lastFill.element.width =
              (this.lastFill.endX - this.lastFill.startX + 1) * PixelSize;
            this.lastFill.element.height =
              (this.lastFill.endY - this.lastFill.startY + 1) * PixelSize;
          } else {
            this.lastFill.startX = mouseRow;
            this.lastFill.startY = mouseCol;
            this.lastFill.startedFilling = true;

            this.lastFill?.element?.destroy();
            this.lastFill.element = this.add
              .rectangle(
                this.lastFill.startX * PixelSize,
                this.lastFill.startY * PixelSize,
                0,
                0,
                this.color,
                1
              )
              .setOrigin(0, 0);
          }
        }
      } else {
        if (
          this.lastMousePixel.row != mouseRow ||
          this.lastMousePixel.col != mouseCol
        ) {
          destroyPixelShadow.bind(this)();
          if (pixelIsInBorders(mouseRow, mouseCol)) {
            document.querySelector(
              "#coordinates"
            ).textContent = `(${mouseRow},${mouseCol})`;

            if (!document.querySelector("#ui").classList.contains("hidden")) {
              addPixelShadow.bind(this)(mouseRow, mouseCol);
            }
          } else {
            resetPixelShadow.bind(this)();
          }
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
    this.cameras.main.centerOn(
      CanvasWidth / 2,
      CanvasHeight / 2 + UIHeight / 2 / this.cameras.main.zoom
    );
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
