export const getBoard = function () {
  return fetch("https://yildizplace-backend.onrender.com/api/pixels/getColors")
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
