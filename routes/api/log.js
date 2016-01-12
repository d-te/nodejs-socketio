'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Log = mongoose.model('Log');
var Repository = require('../../repositories/log').Repository;
var Controller = require('../../controllers/api/log').Controller;

router
	.all('/*', function(req, res, next) {
		var repository = new Repository(Log);
		req.controller = new Controller(repository);
		next();
	});

router
	.route('/')
		.get(function(req, res, next) {
			req.controller.index(req, res, next);
		});

router
	.route('/user-actions')
		.get(function(req, res, next) {
			req.controller.getUserActions(req, res, next);
		});

module.exports = router;
