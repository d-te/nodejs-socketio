'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var User = mongoose.model('User');
var Repository = require('../../repositories/user').Repository;
var Controller = require('../../controllers/api/user').Controller;

router
	.all('/*', function(req, res, next) {
		var repository = new Repository(User);
		req.controller = new Controller(repository);
		next();
	});

router
	.route('/')
		.get(function(req, res, next) {
			req.controller.index(req, res, next);
		})
		.post(function(req, res, next) {
			req.controller.create(req, res, next);
		});

 router
	.route('/:id')
		.get(function(req, res, next) {
			req.controller.show(req, res, next);
		})
		.delete(function(req, res, next) {
			req.controller.destroy(req, res, next);
		})
		.put(function(req, res, next) {
			req.controller.update(req, res, next);
		});

module.exports = router;
