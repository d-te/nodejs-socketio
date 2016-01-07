'use strict';
var _ = require('underscore');
var NodeValidator = require('pure-validator-node');
var validator = require('pure-validator');

class UserController {

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
			'query.email': ['optional', 'isEmail'],
			'query.name': ['optional', 'isTypeString'],
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
			by: req.query['order_by'],
			direction: req.query['order_direction'],
		};

		var criterias = _.omit(req.query, ['limit', 'offset', 'order']);

		this
			.getRepository()
			.getEntities(criterias, limit, offset, order, function(err, entities) {
				if (err) {
					return res.status(400).json(err.message);
				}

				res.status(200).json(entities);
			});
	}

	show(req, res, next) {
		this.validator.check(req, {
			'params.id': ['isMongoId']
		});
		if (this.validator.errors) {
			return res.status(400).json(this.validator.errors);
		}

		var self = this;
		var id = req.params.id;
		this
			.getRepository()
			.getEntity(id, function(err, entity) {
				if (err) {
					return res.status(400).json(err.message);
				}
				if (entity === null) {
					return res.status(404).json('Not Found');
				}

				res.status(200).json(entity);
			});
	}

	create(req, res, next) {
		this.validator.check(req, {
			'body.email': ['isNotEmptyString', 'isEmail'],
			'query.name': ['isNotEmptyString', 'isTypeString'],
		});
		if (this.validator.errors) {
			return res.status(400).json(this.validator.errors);
		}

		var self = this;
		var entity = req.body;

		this
			.getRepository()
			.createEntity(entity, function(err, entity) {
				if (err) {
					return res.status(400).json(err.message);
				}
				res.status(200).json(entity.id);
			});
	}

	update(req, res, next) {
		this.validator.check(req, {
			'params.id': ['isMongoId'],
			'body.email': ['isNotEmptyString', 'isEmail'],
			'query.name': ['isNotEmptyString', 'isTypeString'],
		});
		if (this.validator.errors) {
			return res.status(400).json(this.validator.errors);
		}

		var self = this;
		var id = req.params.id;

		this
			.getRepository()
			.updateEntity(id, req.body, function(err, entity) {
				if (err) {
					return res.status(400).json(err.message);
				}
				if (entity === null) {
					return res.status(404).json('Not Found');
				}
				res.status(200).json('saved');
			});
	}

	destroy(req, res, next) {
		this.validator.check(req, {
			'params.id': ['isMongoId']
		});
		if (this.validator.errors) {
			return res.status(400).json(this.validator.errors);
		}

		var self = this;
		var id = req.params.id;

		this
			.getRepository()
			.destroyEntity(id, function(err) {
				if (err) {
					return res.status(400).json(err.message);
				}

				res.status(200).json('deleted');
			});
	}

}

module.exports.Controller = UserController;