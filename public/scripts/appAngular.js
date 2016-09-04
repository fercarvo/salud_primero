angular.module('appLogin',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: '../../views/app/login.ejs',
			controller: 'ctrlCentros'
		})
		.state('datos',{
			url: '/datos/{id}',
			templateUrl: 'views/datos.html'
		})
		.state('examenes',{
			url: '/examenes/{id}',
			templateUrl: 'views/examenes.html'
		})
		$urlRouterProvider.otherwise('login');
	})
	.controller('ctrlCentros',function(){

	})