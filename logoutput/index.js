// Log Output application

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let random

function createRandomString() {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter< 10) {
    randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return randomString;
}

function getRandom() {
  random = createRandomString()

  random = new Date().toISOString() + "::" + random
  console.log(random);

  setTimeout(getRandom, 5000)

  return random;
}

getRandom()

app.get('/current', (req, res) => {
  res.send(`TimeStamp: ${random}`);
});

app.listen(port, () => {
  console.log(`RandomString is generated at http://localhost:${port}`);
});