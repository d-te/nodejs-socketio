var app = angular.module(
	'ChatApp',
	[
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'btford.socket-io',
		'LocalStorageModule',

		'ChatApp.AuthService',
		'ChatApp.SocketService',

		'ChatApp.AuthController',
		'ChatApp.ChatController',
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
			/*when('/actions', {
				templateUrl: '/partials/chat.html',
				controller: 'ChatApp.ChatController'
			}).
			when('/components', {
				templateUrl: '/partials/components.html',
				controller: 'ChatApp.ComponentsController'
			}).*/
			otherwise({
				redirectTo: '/'
			});
		}
	])
	.run( function($rootScope, $location) {
		$rootScope.$on( '$routeChangeStart', function(event, next, current) {
			if ( $rootScope.loggedUser === null ) {
				if ( next.$$route.templateUrl === 'partials/login.html' ) {
				} else {
					$location.path('/');
				}
			}
		});
	});
