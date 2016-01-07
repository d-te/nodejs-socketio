'use strict';

var _ = require('underscore');

class UserRepository {

	constructor(model) {
		this._model = model;
	}

	getModel() {
		return this._model;
	}

	getEntity(id, cb) {
		this
			.getModel()
			.findById(id, function (err, entity) {
  				cb(err, entity);
			});
	}

	getEntities(criterias, limit, offset, order, cb) {
		limit = parseInt(limit) || 10;
		offset = parseInt(offset) || 0;
		var conditions = this.processCriterias(criterias);
		var orderCondition = this.processOrder(order);

		this
			.getModel()
			.find(conditions)
			.limit(limit)
			.skip(offset)
			.sort(orderCondition)
			.exec(function(err, entities){
				cb(err,entities);
			});
	}

	processCriterias(criterias) {
		//should be implemented in entity repositories
		return {};
	}

	processOrder(order) {
		var result = order.by || 'email';

		if (order.direction == 'desc') {
			result = '-' + result;
		}

		return result;
	}

	createEntity(fields, cb) {
		this
			.getModel()
			.create(fields, function(err, entity) {
				cb(err, entity);
			});
	}

	updateEntity(id, fields, cb) {
		var self = this;
		fields = _.omit(fields, ['id', 'createdAt', 'updatedAt']);

		this
			.getModel()
			.findById(id, function (err, entity) {
				if (entity) {
					_.extend(entity, fields);
					entity.save(function(err,entity){
						cb(err, entity);
					});
				} else {
					cb(err, entity);
				}
			});
	}

	destroyEntity(id, cb) {
		this
			.getModel()
			.remove({ _id: id }, function(err, email) {
				cb(err, email);
			});
	}
}

module.exports.Repository = UserRepository;