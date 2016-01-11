'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Statistics = mongoose.model('Statistics');
var Repository = require('../../repositories/statistics').Repository;
var Controller = require('../../controllers/api/statistics').Controller;

router
	.all('/*', function(req, res, next) {
		var repository = new Repository(Statistics);
		req.controller = new Controller(repository);
		next();
	});

router
	.route('/')
		.get(function(req, res, next) {
			req.controller.index(req, res, next);
		});

module.exports = router;
