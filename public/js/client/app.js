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

		'ChatApp.AuthController',
		'ChatApp.ChatController',
		'ChatApp.ActionsController',
		'ChatApp.ComponentsController',
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
				templateUrl: '/partials/chat.html',
				controller: 'ChatController'
			}).
			when('/actions', {
				templateUrl: '/partials/actions.html',
				controller: 'ActionsController'
			}).
			when('/components', {
				templateUrl: '/partials/components.html',
				controller: 'ComponentsController'
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
