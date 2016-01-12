var app = angular.module('ChatApp.SocketListener', []);

app.service('SocketListener', [
	'SocketService',
	function (SocketService) {
		var listeners = {};

		var service = {
			messages: [],
			addEventListener: addEventListener,
			removeAllEventListeners: removeAllEventListeners,
			init: init,
		};

		function addEventListener(event, handler) {
			if (!listeners.hasOwnProperty('event')) {
				listeners[event] = [];
			}

			listeners[event].push(handler);
		}

		function removeAllEventListeners() {
			listeners = {};
		}

		function dispatchEvent(event, data) {
			if (listeners.hasOwnProperty(event)) {
				angular.forEach(listeners[event], function(func){
					func(data);
				});
			}
		}

		function init() {
			SocketService.init();

			var io = SocketService.getSocket();

			io.on('init', onInit);
			io.on('user:join', onUserJoin);
			io.on('user:left', onUserLeft);
			io.on('send:message', onSendMessage);

			service.messages = [];
		}

		function onInit(data) {
			//TODO get list of online users
		}

		function onUserJoin(user) {
			service.messages.push({
				text: user.name + ' has joined'
			});
			dispatchEvent('onUserJoin', user);
		}

		function onUserLeft(user) {
			service.messages.push({
				text: user.name + ' has left'
			});
			dispatchEvent('onUserLeft', user);
		}

		function onSendMessage(data) {
			service.messages.push({
				user: data.user,
				text: data.text
			});
			dispatchEvent('onSendMessage', data);
		}

		return service;
	}
]);
