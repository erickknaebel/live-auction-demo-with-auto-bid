/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const targetPath = './.env';
const colors = require('colors');
const dotnenv = require('dotenv');
dotnenv.config();

console.log(`NODE_ENV is set to ${process.env.NODE_ENV}`);

let config = ``;

if (process.env.NODE_ENV === 'test') {
  config = `
    APP_HOST = http://localhost
    APP_PORT = 3000
    API_VERSION = v1
    SECRET_KEY = b60264f
    TOKEN_EXP = 1h
    NODE_ENV = test`;
} else {
  config = `
    APP_HOST = http://localhost
    APP_PORT = 3000
    API_VERSION = v1
    DATABASE = mongodb://localhost/auctions
    DATABASE_TEST = mongodb://localhost/test
    SECRET_KEY = b6264fca-8adf-457f-a94f-5a4b0d1ca2b9
    TOKEN_EXP = 1`;
}

console.log(colors.magenta('The file `.env` will be written as: \n'));
console.log(colors.grey(config));
fs.writeFile(targetPath, config, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`.env file generated at ${targetPath} \n`));
  }
});
