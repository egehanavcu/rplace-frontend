export const getBoardReconnect = function (lastHeartBeatAt) {
  const unixStartDate = lastHeartBeatAt - 30;
  const unixEndDate = Math.floor(Date.now() / 1000);
  return fetch(
    `https://yildizplace-backend.onrender.com/api/pixels/getPixelsBetweenDates?unixStartDate=${unixStartDate}&unixEndDate=${unixEndDate}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
