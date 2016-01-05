'use strict';
var _ = require('underscore');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var commonConfig = {
};

var config = require('./env/' + process.env.NODE_ENV);
if (!config) {
	console.error('Cannot find config file for ' + process.env.NODE_ENV + ' environment');
	process.exit(1);
}
config = _.extend(commonConfig, config);

module.exports = config;