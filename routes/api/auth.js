'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var User = mongoose.model('User');
var Repository = require('../../repositories/user').Repository;
var Controller = require('../../controllers/api/auth').Controller;

router
	.all('/*', function(req, res, next) {
		var repository = new Repository(User);
		req.controller = new Controller(repository);
		next();
	});

router
	.route('/login')
		.post(function(req, res, next) {
			req.controller.login(req, res, next);
		});

module.exports = router;
