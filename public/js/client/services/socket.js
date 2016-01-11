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

		return factory;
	}
]);
