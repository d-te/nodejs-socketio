'use strict';
var _ = require('underscore');
var NodeValidator = require('pure-validator-node');
var validator = require('pure-validator');

class LogController {

	constructor(repository) {
		this._repository = repository;
		this.validator = new NodeValidator(validator);
	}

	getRepository() {
		return this._repository;
	}

	index(req, res, next) {
		var self = this;

		this.validator.check(req, {
			'query.user': ['optional', 'isTypeString'],
			'query.limit': ['optional', {'isInt': {'min': 1, 'max': 100}}],
			'query.order_by': ['optional', 'isTypeString'],
			'query.order_direction': ['optional', {'isIn': ['asc', 'desc']}],
		});
		if (this.validator.errors) {
			return res.status(400).json(this.validator.errors);
		}

		var limit = parseInt(req.query.limit) || 10;
		var offset = parseInt(req.query.offset) || 0;
		var order = {
			by: req.query.order_by,
			direction: req.query.order_direction,
		};

		var criterias = _.omit(req.query, ['limit', 'offset', 'order']);

		this
			.getRepository()
			.getEntities(criterias, limit, offset, order)
			.then(function(entities){
				res.status(200).json(entities);
			})
			.catch(function(err){
				res.status(400).json(err.message);
			});
	}

	getUserActions(req, res, next) {
		if (!req.session.loggedUser) {
			res.status(403).json('Access denied');
		}
		var self = this;

		var limit = 0;
		var offset = 0;
		var order = {
			by: 'timestamp',
			direction: 'desc',
		};

		var criterias = {user: req.session.loggedUser._id};

		this
			.getRepository()
			.getEntities(criterias, limit, offset, order)
			.then(function(entities){
				res.status(200).json(entities);
			})
			.catch(function(err){
				res.status(400).json(err.message);
			});
	}
}

module.exports.Controller = LogController;