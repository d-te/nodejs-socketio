'use strict';
var _ = require('underscore');
var NodeValidator = require('pure-validator-node');
var validator = require('pure-validator');

class SocketController {

	constructor(repository, socket) {
		this._repository = repository;
		this._socket = socket;
		this.validator = new NodeValidator(validator);
	}

	getRepository() {
		return this._repository;
	}

	getSocket() {
		return this._socket;
	}

	login(data) {
		//TODO
	}

	sendMessage(data) {
		//TODO
	}

	sendCommand(data) {
		//TODO
	}

	sendEvent(data) {
		//TODO
	}

	disconnect() {
		//TODO
	}
}

module.exports.Controller = SocketController;