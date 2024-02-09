import { getBoardReconnect } from "../_socket/getBoardReconnect";
import { PixelSize } from "./constants";

export const reconnectDraw = function (data) {
  getBoardReconnect(this.lastHeartbeatAt).then((data) => {
    this.renderTexture.beginDraw();
    for (const dataPixel of data) {
      this.renderTexture.batchDraw(
        this.batchPixels[parseInt(dataPixel.color, 16)],
        dataPixel.x * PixelSize + PixelSize / 2,
        dataPixel.y * PixelSize + PixelSize / 2
      );
    }
    this.renderTexture.endDraw();
  });
};
