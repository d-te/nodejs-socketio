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

	getClientByUserId(id) {
		return _.findWhere(this.getClients(), { userId: id });
	}

	addClient(client, user) {
		this._clients.push({
			id: client.id,
			userId: user.id,
			client: client,
			user: user
		});
	}

	removeClient(id) {
		this._clients = _.reject(this._clients, function(item){ return item.id === id; });
	}
}

module.exports.Repository = Repository;