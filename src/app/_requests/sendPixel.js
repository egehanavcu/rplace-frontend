import { DOMAIN } from "../_utils/constants";

export const sendPixel = function (row, col, color) {
  return fetch(`${DOMAIN}/api/pixels/addPixel`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x: row,
      y: col,
      color: color.toString(16),
    }),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
