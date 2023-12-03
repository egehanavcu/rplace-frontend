export const getBoard = function () {
  return fetch("http://192.168.0.22:8080/api/pixels/getBoard")
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
