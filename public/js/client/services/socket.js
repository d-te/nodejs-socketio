var app = angular.module('ChatApp.SocketService', []);

app.factory('SocketService', function (socketFactory) {
	var ioSocket;
	var socket;

	var factory = {
		init: function() {
			ioSocket = io.connect();

			socket = socketFactory({
				ioSocket: myIoSocket
			});
		},
		io: function () {
			if (!socket) {
				factory.init();
			}
			return socket;
		}

	};

	return factory;
});
