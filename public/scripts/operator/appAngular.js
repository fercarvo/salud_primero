angular.module('appOperator',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('RegistrarPaciente',{
				url: '/RegistrarPaciente',
				templateUrl: 'views/operario/registrarPaciente.html',
				controller:'ctrlRegp'
			})
			.state('RegistrarMuestra',{
				url: '/RegistrarMuestra',
				templateUrl: 'views/operario/registrarMuestra.html',
                        controller:'ctrlRegm'
			})
			.state('Reportes',{
				url: '/Reportes',
				templateUrl: 'views/operario/reportes.html'
			});
		$urlRouterProvider.otherwise('RegistrarPaciente');
	})
	.controller('ctrlRegp',function($scope, $state){
		
	})
	.controller('ctrlRegm',function($scope, $state){
	    init();
	})

function init(){
    var urlResultados = "json/muestrasRegistradas.json";
    var n=1;
    $.getJSON(urlResultados,function(respuesta){
        respuesta.forEach(function(muestra){
            var elemento = $("<tr>");
            elemento.append("<td>" + n + "</td>");
            elemento.append("<td>" + muestra.descripcion + "</td>");
            elemento.append("<td>" + muestra.codigo + "</td>");
            elemento.append("<td>" + muestra.estado + "</td>");
            $(".tabla-resultado").append(elemento);
            n=n+1;
        });
    });
}