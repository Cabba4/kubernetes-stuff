// Log Output application

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

const getRandom = () => {
  const random = createRandomString()

  console.log(new Date().toISOString() + "::" + random);

  setTimeout(getRandom, 5000)
}

function greetings() {
  const introText = `
  Exercise 1.01: Getting started

  Output should be <TimeStamp>::<RandomString>
  `

  console.log(introText)
}

greetings()
getRandom()