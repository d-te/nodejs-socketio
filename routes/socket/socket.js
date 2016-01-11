'use strict';
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Repository = require('../../repositories/user').Repository;
var Controller = require('../../controllers/socket').Controller;
var ClientsRepository = require('../../repositories/clients').Repository;
var clientsRepository = new ClientsRepository();
var userRepository = new Repository(User);

module.exports = function (socket) {
	var controller = new Controller(userRepository, socket, clientsRepository);

	controller.connect();

	socket.on('send:message', function (data) {
		controller.sendMessage(data);
	});

	socket.on('send:command', function (data) {
		controller.sendCommand(data);
/*		socket.broadcast.emit('send:command', {
			user: name,
			text: data.command
		});*/
	});

	socket.on('send:event', function (data) {
		controller.sendEvent(data);
		/*socket.broadcast.emit('send:event', {
			user: name,
			text: data.command
		});*/
	});

	socket.on('disconnect', function () {
		controller.disconnect();
		/*socket.broadcast.emit('user:left', {
			name: name
		});*/
	});
};