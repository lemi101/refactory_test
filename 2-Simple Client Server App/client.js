const axios = require('axios');
const crypto = require('crypto');

var url = "http://127.0.0.1:1337/";
var counter = 0;
var timeout = 60 * 1000;

setInterval(() => {
    var rand = crypto.randomBytes(8).toString('hex');
    const header = {
        headers: {"X-RANDOM": rand}
      };
    
    axios.post(url, { "counter": counter }, header).then((response) => {
        console.log(`"X_RANDOM": ${rand}`);
        console.log(`{ "counter": ${counter} }`);
        console.log(`Data ${counter} - Status ${response.status}`);
        counter++;
      }, (error) => {
        console.log(error);
      });
}, timeout);