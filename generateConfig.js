'use strict';
const argv = require('yargs').argv;
const fs = require('fs-extra');


// QA / Test
const qaUrl = 'http://ec2-18-224-56-85.us-east-2.compute.amazonaws.com:3001';


// Production
const prodUrl = 'https://krios.io';

let baseUrl = null;

console.log(`==========================================================================\n`);
console.log(`Removing the Environment config\n`);
console.log(`==========================================================================\n`);
fs.removeSync(__dirname + '/environment.json');


function generateFile() {
  argv.env = argv.env || process.env.INKSOFT_ENV;

  switch (argv.env) {
    case 'prod':
      baseUrl = prodUrl;
      break;
    case 'qa':
      baseUrl = qaUrl;
      break;
    default:
      baseUrl = qaUrl;
  }

  argv.uri = argv.uri || process.env.INKSOFT_URI;
  // Set the store name
  let storeName = argv.uri || 'ies';
  let envName = argv.env;

  // Product base urls
  let obj = {
    env: envName,
    url: baseUrl
  };

  fs.writeFile(__dirname + '/environment.json', JSON.stringify(obj, null, 2), function () {
    console.log('Environment config generated Successfully');
  });
}

generateFile();