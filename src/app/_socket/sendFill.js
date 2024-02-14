export const sendFill = function (startX, startY, endX, endY, color, key) {
  return fetch("https://yildizplace-backend.onrender.com/api/pixels/fill", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startX,
      startY,
      endX,
      endY,
      color: color.toString(16),
      key,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
