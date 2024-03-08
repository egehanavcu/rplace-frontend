import { getBoardReconnect } from "../_requests/getBoardReconnect";
import { PixelSize } from "./constants";

export const reconnectDraw = function (data) {
  getBoardReconnect(this.lastHeartbeatAt).then((data) => {
    for (const dataPixel of data) {
      this.renderTexture.draw(
        new Phaser.GameObjects.Rectangle(
          this,
          0,
          0,
          PixelSize,
          PixelSize,
          parseInt(dataPixel.color, 16)
        ),
        dataPixel.x * PixelSize + PixelSize / 2,
        dataPixel.y * PixelSize + PixelSize / 2
      );
    }
  });
};
