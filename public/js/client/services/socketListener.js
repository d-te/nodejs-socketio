var app = angular.module('ChatApp.SocketListener', []);

app.service('SocketListener', [
	'SocketService',
	function (SocketService) {

		var service ={
			init: init,
		};

		function init() {
			SocketService.init();

			var io = SocketService.getSocket();

			io.on('init', onInit);
		}

		function onInit(data) {
			console.log('onInit', data);
		}

		return service;
	}
]);
