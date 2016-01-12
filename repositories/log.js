'use strict';

var _ = require('underscore');
var BaseRepository = require('./base-repository').Repository;

class LogRepository extends BaseRepository {

	processCriterias(criterias) {
		var conditions = {
			level: { $in: ['message', 'command', 'statistics'] },
		};

		_.each(criterias, function(val, key) {
			switch(key) {
				case 'user':
					conditions['meta.author'] = val;
					break;
			}
		});

		return conditions;
	}

	processOrder(order) {
		var result = order.by || 'timestamp';

		if (order.direction == 'desc') {
			result = '-' + result;
		}

		return result;
	}
}

module.exports.Repository = LogRepository;