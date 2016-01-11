'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StatisticsSchema = new Schema({
	type: { type : String, default : '', trim : true, required : true },
	action: { type : String },
	value: { type : String },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt  : { type : Date, default : Date.now },
});

StatisticsSchema.pre('save', function(next) {
 	var now = new Date();

 	if ( !this.createdAt ) {
		this.createdAt = now;
 	}

 	next();
});

mongoose.model('Statistics', StatisticsSchema);