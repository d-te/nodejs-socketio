var app = angular.module(
	'ChatApp',
	[
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'btford.socket-io',
		'LocalStorageModule',

		'ChatApp.AuthService',
		'ChatApp.LogService',
		'ChatApp.SocketService',
		'ChatApp.SocketListener',
		'ChatApp.UserService',

		'ChatApp.AuthController',
		'ChatApp.ChatController',
		'ChatApp.CommandsController',
		'ChatApp.ActionsController',
		'ChatApp.UsersController',
	]
	)
	.config(['localStorageServiceProvider', function(localStorageServiceProvider){
		localStorageServiceProvider.setPrefix('ChatApp');
	}])
	.config(['$routeProvider',
		function($routeProvider) {

			$routeProvider.
			when('/', {
				templateUrl: '/partials/login.html',
				controller: 'AuthController'
			}).
			when('/chat', {
				templateUrl: '/partials/admin/chat.html',
				controller: 'ChatController'
			}).
			when('/commands', {
				templateUrl: '/partials/admin/commands.html',
				controller: 'CommandsController'
			}).
			when('/actions', {
				templateUrl: '/partials/admin/actions.html',
				controller: 'ActionsController'
			}).
			when('/users', {
				templateUrl: '/partials/admin/users.html',
				controller: 'UsersController'
			}).
			otherwise({
				redirectTo: '/'
			});
		}
	])
	.run( function($rootScope, $location) {
		$rootScope.$on( '$routeChangeStart', function(event, next, current) {
			if (!$rootScope.loggedUser) {
				if ( next.$$route.templateUrl === 'partials/login.html' ) {
				} else {
					$location.path('/');
				}
			}
		});
	});
