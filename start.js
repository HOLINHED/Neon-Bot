'use strict'

require('@babel/register')({});

console.log("BABEL LOADED!");

module.exports = require('./index.js');