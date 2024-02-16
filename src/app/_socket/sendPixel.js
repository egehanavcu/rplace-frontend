export const sendPixel = function () {
  return fetch("https://backend.egehan.dev/api/pixels/addPixel", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x: this.selectedPixel.row,
      y: this.selectedPixel.col,
      color: this.color.toString(16),
    }),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));

  /*
  this.stompClient.send(
    "/app/pixel",
    {},
    JSON.stringify({
      x: this.selectedPixel.row,
      y: this.selectedPixel.col,
      color: this.color.toString(16),
    })
  );
  */
};
