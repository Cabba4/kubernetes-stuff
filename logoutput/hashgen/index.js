const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// File path to read the timestamp
const filePath = path.join('/usr/src/app/shared', 'timestamp.txt');
const pongPath = path.join('/usr/src/app/shared', 'pongCount.txt');

let timestamp, hash, pong

// Function to read the timestamp and generate a hash
const readAndHashTimestamp = () => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading from file', err);
    } else {
      timestamp = data.trim();
      console.log("Read success");
    }
  });
  fs.readFile(pongPath, 'utf8', (err,data) => {
    if (err) {
      console.error('Error reading from pong file', err);
    } else {
      pong = data.trim();
      console.log("Read success");
    }
  })
};

// Call the function to read and hash the timestamp
readAndHashTimestamp();
setInterval(readAndHashTimestamp, 5000)

app.get('/', (req, res) => {
  hash = crypto.createHash('sha256').update(timestamp).digest('hex');
  res.send(`${timestamp} : ${hash} <br>
    ${pong}` )
});

app.listen(port, () => {
  console.log(`RandomString is generated at http://localhost:${port}`);
});