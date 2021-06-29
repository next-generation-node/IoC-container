'use strict';

const {TRANSIENT, SINGLETON} = require('./constants');

module.exports = {
  DI: require('./DIContainer'),
  TRANSIENT,
  SINGLETON,
};
