export const sendPixel = function () {
  this.stompClient.send(
    "/app/pixel",
    {},
    JSON.stringify({
      x: this.selectedPixel.row,
      y: this.selectedPixel.col,
      color: this.color.toString(16),
    })
  );
};
