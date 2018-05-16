const path = require('path')
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening on port 3000!'));
app.all('/', function (req, res) {
  res.sendFile(__dirname + '/omikuji_vn.html');
});