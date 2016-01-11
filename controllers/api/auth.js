'use strict';
var _ = require('underscore');
var NodeValidator = require('pure-validator-node');
var validator = require('pure-validator');

class AuthController {

	constructor(repository) {
		this._repository = repository;
		this.validator = new NodeValidator(validator);
	}

	getRepository() {
		return this._repository;
	}

	login(req, res, next) {
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
			.getEntityByEmail(entity.email)
			.then(function(user){
				if (user === null) {
					self
						.getRepository()
						.createEntity(entity)
						.then(function(user){
							res.status(200).json(user);
						})
						.catch(function(err){
							res.status(400).json(err.message);
						});
				} else {
					res.status(200).json(user);
				}
			})
			.catch(function(err){
				res.status(400).json(err.message);
			});
	}
}

module.exports.Controller = AuthController;