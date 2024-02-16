export const sendInviteLink = function (email) {
  return fetch(
    `https://backend.egehan.dev/api/users/register?schoolMail=${email}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.error("Parsing error: ", error));
};
