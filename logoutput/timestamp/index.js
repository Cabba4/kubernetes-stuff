const fs = require('fs');
const path = require('path');

// File path to save the timestamp
const filePath = path.join('/usr/src/app/shared', 'timestamp.txt');

// Function to update the timestamp and save to file every 5 seconds
const updateTimestamp = () => {
  const currentTimestamp = new Date().toISOString();
  
  fs.writeFile(filePath, currentTimestamp, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log(`Timestamp updated: ${currentTimestamp}`);
    }
  });
};

// Initial update and start interval
updateTimestamp();
setInterval(updateTimestamp, 5000);
