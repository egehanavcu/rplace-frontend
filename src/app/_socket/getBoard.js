export const getBoard = function () {
  return fetch("https://yildizplace-backend.onrender.com/api/pixels/getColors")
    .then((response) => response.json())
    .then((receivedData) => {
      return { data: receivedData.data, success: true };
    })
    .catch((error) => console.error("Parsing error: ", error));
};
