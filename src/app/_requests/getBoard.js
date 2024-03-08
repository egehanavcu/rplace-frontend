import { DOMAIN } from "../_utils/constants";

export const getBoard = function () {
  return fetch(`${DOMAIN}/api/pixels/getColors`, {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((receivedData) => {
      return { data: receivedData.data, success: true };
    })
    .catch((error) => console.error("Parsing error: ", error));
};
