export const getBoard = function () {
  return fetch("http://192.168.1.96:8080/api/pixels/getColors")
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
