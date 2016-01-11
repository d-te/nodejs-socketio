'use strict';

var _ = require('underscore');
var Promise = require('promise');
var BaseRepository = require('./base-repository').Repository;

class UserRepository extends BaseRepository {

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
}

module.exports.Repository = UserRepository;