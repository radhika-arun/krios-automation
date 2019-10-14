'use strict';

const argv = require('yargs').argv;
const config = require('./protractor.shared.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--disable-gpu', 'disable-infobars', '--window-size=1200,1100']
  }
};

exports.config = config;