const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 3000;

let counter = 0;

const filePath = path.join('/usr/src/app/shared', 'pongCount.txt');

app.get('/pingpong', (req, res) => {
  res.send(`pong ${counter}`);
  counter++;
  fs.writeFile(filePath, counter.toString(), (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log(`Pong counter updated: ${counter}`);
    }
  })
});

app.listen(port, () => {
  console.log(`Pingpong app listening at http://localhost:${port}`);
});