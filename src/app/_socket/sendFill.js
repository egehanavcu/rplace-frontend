export const sendFill = function (startX, startY, endX, endY, color) {
  if (color.toString(16) === "000000") {
    color = "0";
  }

  return fetch("https://backend.egehan.dev/api/pixels/fill", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      startX,
      startY,
      endX,
      endY,
      color: color.toString(16),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
