import { PixelSize } from "../_utils/constants";

export const getPixelUpdate = function () {
  this.stompClient.connect({}, (frame) => {
    console.log("Connected to WebSocket");
    this.stompClient.subscribe("/topic/pixels", (response) => {
      console.log("Received message from WebSocket");
      const data = JSON.parse(response.body);
      console.log(data);

      /*
      this.children.getAll()[x * PixelSize + y * PixelSize].setFillStyle(
        parseInt(data.color, 16)
      );
      */

      this.children.getAll().forEach((sprite) => {
        if (
          sprite.x === data.x * PixelSize &&
          sprite.y === data.y * PixelSize
        ) {
          sprite.setFillStyle(parseInt(data.color, 16));
        }
      });
    });
  });
};
