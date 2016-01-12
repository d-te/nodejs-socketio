'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = new Schema({
	message: { type: String },
	timestamp: { type : Date },
	level: { type: String },
	meta: {
		author: { type: String }
	},
}, { collection: 'log' });

mongoose.model('Log', LogSchema);