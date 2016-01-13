var app = angular.module('ChatApp.SocketService', []);

app.factory('SocketService', [
	'socketFactory',
	'$location',
	function (socketFactory, $location) {
		var ioSocket;
		var socket;

		var factory = {
			init: init,
			getSocket: getSocket,
			sendMessage: sendMessage,
			sendStatistics: sendStatistics,
			sendEvent: sendEvent,
		};

		function init() {
			var url = [
				$location.protocol(),
				'://',
				$location.host(),
				':',
				$location.port(),
			].join('');

			ioSocket = io.connect(url);

			socket = socketFactory({
				ioSocket: ioSocket
			});
		}

		function getSocket() {
			if (!socket) {
				factory.init();
			}
			return socket;
		}

		function sendMessage(message) {
			this.getSocket().emit('send:message', message);
		}

		function sendMessageToUser(message, userId) {
			var data = {
				user: userId,
				message: message,
			};

			this.getSocket().emit('send:message:to:user', data);
		}

		function sendStatistics(data) {
			this.getSocket().emit('send:statistics', data);
		}

		function sendEvent(component, event, value) {
			var data = {
				type: 'event',
				action: component + event,
				value: value
			};

			this.sendStatistics(data);
		}

		return factory;
	}
]);
