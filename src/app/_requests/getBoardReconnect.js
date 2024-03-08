import { DOMAIN } from "../_utils/constants";

export const getBoardReconnect = function (lastHeartBeatAt) {
  const unixStartDate = lastHeartBeatAt - 30;
  const unixEndDate = Math.floor(Date.now() / 1000);
  return fetch(
    `${DOMAIN}/api/pixels/getPixelsBetweenDates?unixStartDate=${unixStartDate}&unixEndDate=${unixEndDate}`,
    { credentials: "include" }
  )
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
