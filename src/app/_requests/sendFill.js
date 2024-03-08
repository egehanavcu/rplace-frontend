import { DOMAIN } from "../_utils/constants";

export const sendFill = function (startX, startY, endX, endY, color) {
  if (color.toString(16) === "000000") {
    color = "0";
  }

  return fetch(`${DOMAIN}/api/pixels/fill`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      startX: Math.min(startX, endX),
      startY: Math.min(startY, endY),
      endX: Math.max(startX, endX),
      endY: Math.max(startY, endY),
      color: color.toString(16),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
