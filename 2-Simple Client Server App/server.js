const morgan = require('morgan');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
morgan.token('datas', function getDatas (req) {
    var datas = req.body;
    datas["X-RANDOM"] = req.get("X-RANDOM");
    return JSON.stringify(datas);
  })

app.use(bodyParser.json());
app.use(morgan('[:date[iso]] Success\: :method http\://:remote-addr/ :datas', 
    {stream: fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' })}));

app.post('/', function (req, res) {
    res.sendStatus(201);
})

var server = app.listen(1337, '0.0.0.0', function () {
   console.log("Server started on http://localhost:1337")
})