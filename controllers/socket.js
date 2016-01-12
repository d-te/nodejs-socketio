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
			users: [],
		});

		this.getSocket().broadcast.emit('user:join', this.getUser());
	}

	sendMessage(message) {
		logger.message(message, { author: this.getUser()._id });

		this.getSocket().broadcast.emit('send:message', {
			user: this.getUser(),
			text: message
		});
	}

	sendCommand(data) {
		//TODO
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
			this.getSocket().broadcast.emit('user:left', this.getUser());
		}
	}
}

module.exports.Controller = SocketController;