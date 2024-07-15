const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// File path to read the timestamp
const filePath = path.join('/usr/src/app/shared', 'timestamp.txt');

// Function to read the timestamp and generate a hash
const readAndHashTimestamp = () => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading from file', err);
    } else {
      const timestamp = data.trim();
      const hash = crypto.createHash('sha256').update(timestamp).digest('hex');
      console.log(`Timestamp: ${timestamp}`);
      console.log(`Hash: ${hash}`);
    }
  });
};

// Call the function to read and hash the timestamp
readAndHashTimestamp();
setInterval(readAndHashTimestamp, 5000)