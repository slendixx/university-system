const axios = require("axios");
const fs = require("fs");

const userData = JSON.parse(fs.readFileSync("test-users.json", "utf-8"));
const genders = ["m", "f"];

const requests = userData.map((userData) => {
  const formattedUserData = {};
  const fullName = userData.name.split(" ");

  formattedUserData.firstName = fullName[0];
  formattedUserData.lastName = fullName[1];
  formattedUserData.email = userData.email;
  formattedUserData.password = "abcd1234";
  formattedUserData.gender = genders[randomIntFromInterval(0, 1)];
  const birthDate = userData.date.split("-").map((str) => {
    return Number(str);
  });
  formattedUserData.birthYear = birthDate[0];
  formattedUserData.birthMonth = birthDate[1] - 1;
  formattedUserData.birthDay = birthDate[2];

  return axios.post(
    "http://localhost:3000/api/v1/auth/signup",
    formattedUserData,
    {
      headers: {
        "content-type": "application/json",
        apikey: "271wif40xgj20cxwzp4bp9rzeq1y53",
      },
    }
  );
});

Promise.all(requests)
  .then((results) => {
    console.log("Success!");
    console.log(results);
  })
  .catch((error) => {
    console.log("Error!");
    console.log(error);
  });
/*
const formattedUserData = {};
const fullName = userData[0].name.split(" ");

formattedUserData.firstName = fullName[0];
formattedUserData.lastName = fullName[1];
formattedUserData.email = userData[0].email;
formattedUserData.password = "abcd1234";
formattedUserData.gender = genders[randomIntFromInterval(0, 1)];
const birthDate = userData[0].date.split("-").map((str) => {
  return Number(str);
});
formattedUserData.birthYear = birthDate[0];
formattedUserData.birthMonth = birthDate[1] - 1;
formattedUserData.birthDay = birthDate[2];

axios
  .post("http://localhost:3000/api/v1/auth/signup", formattedUserData, {
    headers: {
      "content-type": "application/json",
      apikey: "271wif40xgj20cxwzp4bp9rzeq1y53",
    },
  })
  .then((results) => {
    console.log("Success!");
    console.log(results);
  })
  .catch((error) => {
    console.log("Error!");
    console.log(error);
  });
*/
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
