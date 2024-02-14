import { PixelSize } from "../_utils/constants";

export const getPixelUpdate = function () {
  this.stompClient.subscribe("/topic/pixels", (response) => {
    console.log("Received pixel from WebSocket");
    const data = JSON.parse(response.body);

    if (this.renderTexture) {
      this.renderTexture.draw(
        new Phaser.GameObjects.Rectangle(
          this,
          0,
          0,
          PixelSize,
          PixelSize,
          parseInt(data.color, 16)
        ),
        data.x * PixelSize + PixelSize / 2,
        data.y * PixelSize + PixelSize / 2
      );
    }
  });
};
