'use strict';
var _ = require('underscore');
var NodeValidator = require('pure-validator-node');
var validator = require('pure-validator');

class SocketController {

	constructor(userRepository, socket, clientsRepository) {
		this._userRepository = userRepository;
		this._socket = socket;
		this._clientsRepository = clientsRepository;
		this.validator = new NodeValidator(validator);
	}

	getUserRepository() {
		return this._userRepository;
	}

	getClientsRepository() {
		return this._clientsRepository;
	}

	getSocket() {
		return this._socket;
	}

	content(socket) {
		//TODO
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