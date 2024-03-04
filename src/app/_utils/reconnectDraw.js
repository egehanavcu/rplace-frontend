import { getBoardReconnect } from "../_socket/getBoardReconnect";
import { PixelSize } from "./constants";

export const reconnectDraw = function (data) {
  getBoardReconnect(this.lastHeartbeatAt).then((data) => {
    /*
    // ESKİ YÖNTEM
    // Bazen tuval yeni piksel ekleyene kadar gözükmüyordu, bu yüzden yeniden bağlanmada batchDraw metodunu kullanmayı bıraktım.
    this.renderTexture.beginDraw();
    for (const dataPixel of data) {
      this.renderTexture.batchDraw(
        this.batchPixels[parseInt(dataPixel.color, 16)],
        dataPixel.x * PixelSize + PixelSize / 2,
        dataPixel.y * PixelSize + PixelSize / 2
      );
    }
    this.renderTexture.endDraw();
    */

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
