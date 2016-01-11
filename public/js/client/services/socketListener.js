var app = angular.module('ChatApp.SocketListener', []);

app.service('SocketListener', [
	'SocketService',
	function (SocketService) {
		var listeners = {};

		var service = {
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
		}

		function onInit(data) {
			console.log('onInit', data);
		}

		function onUserJoin(user) {
			dispatchEvent('onUserJoin', user);
		}

		function onUserLeft(user) {
			dispatchEvent('onUserLeft', user);
		}

		function onSendMessage(data) {
			dispatchEvent('onSendMessage', data);
		}

		return service;
	}
]);
