angular.module('appOperator',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('regp',{
				url: '/RegistrarPaciente',
				templateUrl: 'views/operario/regp.html',
				controller:'ctrlRegp'
			})
			.state('regm',{
				url: '/RegistrarMuestra',
				templateUrl: 'views/operario/regm.html',
                controller:'ctrlRegm'
			})
			.state('reportes',{
				url: '/Reportes',
				templateUrl: 'views/operario/reportes.html',
                controller:'ctrlRep'
			});
		$urlRouterProvider.otherwise('regp');
	})
	.factory('comun',function($http){
		var comun = {}
		comun.tareas = [];/*{
			nombre: 'Comprar comida',
			prioridad: '2'
		},{
			nombre: 'Pasear al perro',
			prioridad: '1'
		}]*/

		comun.tarea = {};

		/*comun.eliminar = function(tarea){
			var indice = comun.tareas.indexOf(tarea);
			comun.tareas.splice(indice, 1);
		}*/

		/*Seccion de metodos remotos*/
		comun.getAll = function(){
			return $http.get('/tareas')
			.success(function(data){
				angular.copy(data, comun.tareas);
				return comun.tareas
			})
		};

		comun.add = function(tarea){
			return $http.post('/tarea', tarea)
			.success(function(tarea){
				comun.tareas.push(tarea);
			})
		}

		comun.update = function(tarea){
			return $http.put('/tarea/'+ tarea._id, tarea)
			.success(function(data){
				var indice = comun.tareas.indexOf(tarea);
				comun.tareas[indice] = data;
			})
		}

		comun.delete = function(tarea){
			return $http.delete('/tarea/'+ tarea._id)
			.success(function(){
				var indice = comun.tareas.indexOf(tarea);
				comun.tareas.splice(indice, 1);
			})
		}

		return comun;
	})
	.controller('ctrlRegp',function($scope, $state, comun){
		init();
	})
	.controller('ctrlRegm',function($scope, $state, comun){
	    init();
	})
	.controller('ctrlRep',function($scope, $state, comun){
	    	
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