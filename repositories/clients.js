'use strict';

var _ = require('underscore');

class Repository {

	constructor() {
		this._clients = [];
	}

	getClients() {
		return this._clients;
	}

	getClientById(id) {
		return _.findWhere(this.getClients(), { id: id });
	}

	getClientsByUserId(id) {
		return _.where(this.getClients(), { userId: id });
	}

	addClient(socket, user) {
		this._clients.push({
			id: socket.id,
			userId: user._id,
			socket: socket,
			user: user
		});
	}

	removeClient(socket) {
		this._clients = _.reject(this._clients, function(item){ return item.id === socket.id; });
	}
}

module.exports.Repository = Repository;