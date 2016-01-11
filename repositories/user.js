'use strict';

var _ = require('underscore');
var Promise = require('promise');

class UserRepository {

	constructor(model) {
		this._model = model;
	}

	getModel() {
		return this._model;
	}

	getEntity(id, errorIfNull) {
		var self = this;
		var promise = new Promise(function (resolve, reject) {
			self
				.getModel()
				.findById(id, function (err, entity) {
					if (err) {
						reject(err);
					} else if (true === errorIfNull && null === entity) {
						reject(new Error('Not found'));
					} else {
						resolve(entity);
					}
				});
		});

		return promise;
	}

	getEntityByEmail(email, errorIfNull) {
		var self = this;
		var promise = new Promise(function (resolve, reject) {
			self
				.getModel()
				.findOne({ email: email }, function (err, entity) {
					if (err) {
						reject(err);
					} else if (true === errorIfNull && null === entity) {
						reject(new Error('Not found'));
					} else {
						resolve(entity);
					}
				});
		});

		return promise;
	}

	getEntities(criterias, limit, offset, order) {
		var self = this;
		limit = parseInt(limit) || 10;
		offset = parseInt(offset) || 0;
		var conditions = this.processCriterias(criterias);
		var orderCondition = this.processOrder(order);

		var promise = new Promise(function (resolve, reject) {
			self
				.getModel()
				.find(conditions)
				.limit(limit)
				.skip(offset)
				.sort(orderCondition)
				.exec(function(err, entities){
					if (err) {
						reject(err);
					} else {
						resolve(entities);
					}
				});
		});

		return promise;
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
		var self = this;
		var promise = new Promise(function (resolve, reject) {
			self
				.getModel()
				.create(fields, function(err, entity) {
					if (err) {
						reject(err);
					} else {
						resolve(entity);
					}
				});
		});

		return promise;
	}

	updateEntity(id, fields, cb) {
		var self = this;
		var promise = new Promise(function (resolve, reject) {
			fields = _.omit(fields, ['id', 'createdAt', 'updatedAt']);
			self
				.getEntity(id, true)
				.then(function(entity){
					_.extend(entity, fields);
					entity.save(function(err,entity){
						if (err) {
							reject(err);
						} else {
							resolve(entity);
						}
					});
				})
				.catch(function(err){
					reject(err);
				});
		});

		return promise;

	}

	destroyEntity(id, cb) {
		var self = this;
		var promise = new Promise(function (resolve, reject) {
			self
				.getModel()
				.remove({ _id: id }, function(err, email) {
					if (err) {
						reject(err);
					} else {
						resolve(id);
					}
				});
		});

		return promise;
	}
}

module.exports.Repository = UserRepository;