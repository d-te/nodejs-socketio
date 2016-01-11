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
		this._user = this.getSocket().request.session.loggedUser;
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

	getUser() {
		return this._user;
	}

	connect() {

		this.getClientsRepository().addClient(this.getSocket(), this.getUser());

		this.getSocket().emit('init', {
			users: [],
		});

		this.getSocket().broadcast.emit('user:join', this.getUser());
	}

	sendMessage(message) {
		//TODO add log
		this.getSocket().broadcast.emit('send:message', {
			user: this.getUser(),
			text: message
		});
	}

	sendCommand(data) {
		//TODO
	}

	sendEvent(data) {
		//TODO
	}

	disconnect() {
		this.getClientsRepository().removeClient(this.getSocket());

		this.getSocket().broadcast.emit('user:left', this.getUser());
	}
}

module.exports.Controller = SocketController;