'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: { type : String, default : '', trim : true, required : true },
	email: { type : String, default : '', trim : true, required : true },
	lastVisitAt : { type : Date },
	lastActionAt : { type : Date },
	createdAt  : { type : Date, default : Date.now },
	updatedAt  : { type : Date, default : Date.now }
});

UserSchema.pre('save', function(next) {
 	var now = new Date();
 	this.updatedAt = now;

 	if ( !this.createdAt ) {
		this.createdAt = now;
 	}

 	next();
});

UserSchema.path('name').required(true, 'User name cannot be blank');
UserSchema.path('email').required(true, 'User email cannot be blank');

mongoose.model('User', UserSchema);