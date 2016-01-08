var app = angular.module('ChatApp.SocketService', []);

app.factory('socket', function (socketFactory) {
    var myIoSocket = io.connect();

    var socket = socketFactory({
        ioSocket: myIoSocket
    });

    return socket;
});
