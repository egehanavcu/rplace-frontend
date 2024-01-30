import { PixelSize } from "../_utils/constants";

export const getPixelUpdate = function () {
  this.stompClient.connect({}, (frame) => {
    console.log("Connected to WebSocket");
    this.stompClient.subscribe("/topic/pixels", (response) => {
      console.log("Received message from WebSocket");
      const data = JSON.parse(response.body);
      console.log(data);

      this.add.rectangle(
        data.x * PixelSize + PixelSize / 2,
        data.y * PixelSize + PixelSize / 2,
        PixelSize,
        PixelSize,
        parseInt(data.color, 16)
      );
    });
  });
};
