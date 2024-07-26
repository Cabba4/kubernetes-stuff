const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 3000;
const axios = require('axios');

let counter = 0;

// const filePath = path.join('/usr/src/app/shared', 'pongCount.txt');

// app.get('/pingpong', (req, res) => {
//   res.send(`pong ${counter}`);
//   counter++;
//   fs.writeFile(filePath, counter.toString(), (err) => {
//     if (err) {
//       console.error('Error writing to file', err);
//     } else {
//       console.log(`Pong counter updated: ${counter}`);
//     }
//   })
// });

async function getTimeStamp(endpoint) {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error){
    throw error;
  }
}

app.get('/', async(req, res) => {
  const endpoint = 'http://logoutput-svc:6666/current'
  try {
    const data = await getTimeStamp(endpoint);
    counter++;
    // Create the plain text response
    let responseText = 'Ping/Pong counter: ' + counter + '\n\n';
    responseText += 'TimeStamp:\n';
    responseText += JSON.stringify(data, null, 2); // Pretty-print JSON
    
    // Send the response as plain text
    res.setHeader('Content-Type', 'text/plain');
    res.send(responseText);
  } catch (error){
    res.status(500).json({ error: 'Error fetching data' });
  }

});

app.listen(port, () => {
  console.log(`Pingpong app listening at http://localhost:${port}`);
});