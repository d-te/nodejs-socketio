"use strict";
var api = require('./api/api');
var web = require('./web/web');

module.exports.configRoutes = function(app, passport) {

	app.all('/*', function (req, res, next) {
		/* CORS headers */
		res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		/* Set custom headers for CORS */
		res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
		if (req.method === 'OPTIONS') {
			res.status(200).end();
		} else {
			next();
		}
	});

	//Web routes
	app.use('/', web);

	//Api routes
	app.use('/api/', api);
}
