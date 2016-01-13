'use strict';
var mongoose = require('mongoose');

var Statistics = mongoose.model('Statistics');
var StatisticsRepository = require('../../repositories/statistics').Repository;

var User = mongoose.model('User');
var UserRepository = require('../../repositories/user').Repository;

var Controller = require('../../controllers/socket').Controller;
var ClientsRepository = require('../../repositories/clients').Repository;

var clientsRepository = new ClientsRepository();
var statisticsRepository = new StatisticsRepository(Statistics);
var userRepository = new UserRepository(User);

module.exports = function (socket) {
	var controller = new Controller(userRepository, statisticsRepository, socket, clientsRepository);

	controller.connect();

	socket.on('send:message', function (data) {
		controller.sendMessage(data);
	});

	socket.on('send:message:to:user', function (data) {
		controller.sendMessageToUser(data);
	});

	socket.on('send:command', function (data) {
		controller.sendCommand(data);
	});

	socket.on('send:statistics', function (data) {
		controller.sendStatistics(data);
	});

	socket.on('disconnect', function () {
		controller.disconnect();
	});
};