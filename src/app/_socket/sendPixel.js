import { PixelSize } from "../_utils/constants";

export const sendPixel = function () {
  this.stompClient.send(
    "/app/pixel",
    {},
    JSON.stringify({
      x: this.selectedPixel.element.x / PixelSize,
      y: this.selectedPixel.element.y / PixelSize,
      color: this.color.toString(16),
    })
  );
};
