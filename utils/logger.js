var config = require('../configs/config');
var winston = require('winston');
require('winston-mongodb').MongoDB;

var levels  = {
	silly: 0,
	debug: 1,
	verbose: 2,
	info: 3,
	warn: 4,
	error: 5,
	message: 6,
	statistics: 7,
	command: 8
};

var logger = new winston.Logger({
	transports: [
		new winston.transports.MongoDB({
			level: 'command',
			db: config.db,
			handleExceptions: true,
			json: true,
		}),
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true
		})
	],
	exceptionHandlers: [
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			humanReadableUnhandledException: true,
		})
	],
	exitOnError: false,
	levels: levels,
});

module.exports = logger;
