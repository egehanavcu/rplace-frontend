import { PixelSize } from "../_utils/constants";

export const getFill = function () {
  this.stompClient.subscribe("/topic/fill", (response) => {
    console.log("Received fill from WebSocket");
    const data = JSON.parse(response.body);

    if (this.renderTexture) {
      this.renderTexture.draw(
        new Phaser.GameObjects.Rectangle(
          this,
          0,
          0,
          PixelSize * (data.endX - data.startX + 1),
          PixelSize * (data.endY - data.startY + 1),
          parseInt(data.color, 16)
        ),
        data.startX * PixelSize +
          ((data.endX - data.startX + 1) * PixelSize) / 2,
        data.startY * PixelSize +
          ((data.endY - data.startY + 1) * PixelSize) / 2
      );
    }
  });
};
