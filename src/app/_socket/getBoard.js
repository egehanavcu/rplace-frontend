export const getBoard = function () {
  return fetch("https://backend.egehan.dev/api/pixels/getColors", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((receivedData) => {
      return { data: receivedData.data, success: true };
    })
    .catch((error) => console.error("Parsing error: ", error));
};
