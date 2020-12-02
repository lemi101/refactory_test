const axios = require("axios");
const config = require("../config").config;

async function getUserInfo(token) {
  try {
    const { data } = await axios({
      method: "get",
      url: `${config.apiUrl}/user`,
      headers: {
        Authorization: "token " + token,
      },
    });

    return data;

  } catch (error) {
    console.log(error)
  }
  
  }

module.exports = { getUserInfo }
