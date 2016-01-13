'use strict';
var _ = require('underscore');
var NodeValidator = require('pure-validator-node');
var validator = require('pure-validator');
var logger = require('../utils/logger');

class SocketController {

	constructor(statisticsRepository, socket, clientsRepository) {
		this._statisticsRepository = statisticsRepository;
		this._socket = socket;
		this._clientsRepository = clientsRepository;
		this.validator = new NodeValidator(validator);
		this._user = this.getSocket().request.session.loggedUser;
	}

	getStatisticsRepository() {
		return this._statisticsRepository;
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
		if (!this.getUser()) {
			this.getSocket().disconnect();
			return;
		}

		this.getClientsRepository().addClient(this.getSocket(), this.getUser());

		this.getSocket().emit('init', {
			users: this.getClientsRepository().getUsers(),
		});

		var userClients = this.getClientsRepository().getClientsByUserId(this.getUser()._id);
		if (userClients.length === 1) {
			this.getSocket().broadcast.emit('user:join', this.getUser());
		}
	}

	sendMessage(message) {
		logger.message(message, { author: this.getUser()._id });

		this.getSocket().broadcast.emit('send:message', {
			user: this.getUser(),
			text: message
		});
	}

	sendMessageToUser(data) {
		logger.message(data.message, { author: this.getUser()._id, recipient: data.user});

		var userClients = this.getClientsRepository().getClientsByUserId(data.user);
		for (var i = 0; i < userClients.length; i++) {
			userClients[i].socket.emit('send:message', {
				user: this.getUser(),
				text: data.message
			});
		};
	}

	sendCommand(data) {
		logger.command(data.command, { author: this.getUser()._id, recipient: data.user});

		var userClients = this.getClientsRepository().getClientsByUserId(data.user);
		for (var i = 0; i < userClients.length; i++) {
			userClients[i].socket.emit('send:command', {
				user: this.getUser(),
				recipient: data.user,
				command: data.command
			});
		};
	}

	sendStatistics(data) {
		logger.statistics(data, { author: this.getUser()._id });
		data._user = this.getUser()._id ;
		this
			.getStatisticsRepository()
			.createEntity(data);
	}

	disconnect() {
		if (this.getUser()) {
			this.getClientsRepository().removeClient(this.getSocket());

			var userClients = this.getClientsRepository().getClientsByUserId(this.getUser()._id);
			if (userClients.length === 0) {
				this.getSocket().broadcast.emit('user:left', this.getUser());
			}
		}
	}
}

module.exports.Controller = SocketController;