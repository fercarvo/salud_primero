angular.module('appMuestras',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('muestra',{
				url: '/muestra',
				templateUrl: 'views/laboratorista/muestra.html',
				controller: 'ctrlCargar'
			})
			.state('editar',{
				url: '/editar/{id}',
				templateUrl: 'views/laboratorista/editar.html',
				controller: 'ctrlEditar'
			})
		$urlRouterProvider.otherwise('muestra');})
	.factory('comun',function($http){
		var comun = {}
        
		comun.muestras = [];
		comun.muestra = {};

		/*Seccion de metodos remotos*/
		comun.getAll = function(){
			return $http.get('/muestras')
			.success(function(data){
				angular.copy(data, comun.muestras);
				return comun.muestras
			})
		};

		/*
        comun.add = function(muestra){
			return $http.post('/muestras', muestra)
			.success(function(muestra){
				comun.muestras.push(muestra);
			})
		}

		comun.update = function(muestra){
			return $http.put('/muestras/'+ muestra._id, muestra)
			.success(function(data){
				var indice = comun.muestras.indexOf(muestra);
				comun.muestras[indice] = data;
			})
		}


		comun.delete = function(muestra){
			return $http.delete('/muestras/'+ muestra._id)
			.success(function(){
				var indice = comun.muestras.indexOf(muestra);
				comun.muestras.splice(indice, 1);
			})
		}
        */
		return comun;})
	.controller('ctrlCargar', function($scope, $state, dataService, comun) {
        comun.getAll();
        $scope.muestras = comun.muestras;

        $scope.cargarExamenes = function(id) {
        	dataService.setProperty(id);
        	console.log(dataService.getProperty());
            $state.go('editar');
        }})
	.controller('ctrlEditar',function($scope, $state, $http, dataService){
        $scope.examenes = {};
        id = dataService.getProperty();
        var url =  "/muestra/" + id + "/examenes";

		$http.get(url)
            .then(function (response) {
                //console.log(url);
                //console.log(response.data);
                $scope.examenes = response.data;
            }
        );

        $scope.abrir = function(){
        	$('#modal1').openModal();
        };
        $scope.openAdd = function(){
        	$('#modal2').openModal();
        };
        })

$(document).ready(function() {

    //FUNCION que al hacer click en la casilla de llego en una muestra, cambia a true
    $('body').on('click', '.llego', function () {
        var elemento = $(this);
        var id_muestra = $(this).siblings('.id_muestra').text();
        var url = "/muestra/" + id_muestra;
        var llego = Boolean($(this).siblings('.llego').text());
        
        $.ajax({
            type:'PATCH',
            url: url,
            data: {
                recibido: !llego
             },
            success:function(data){
            }
        });
    });


    $('body').on('click', '.editar', function () {
        var elemento = $(this);
        var id_examen = elemento.siblings('.id_examen').text();

        $("#titulo_form").text( "Examen de tipo " + elemento.siblings('.parametro').text() );
        $("input#unidades.form-control").val( elemento.siblings('.unidades').text() );
        $("input#resultado.form-control").val( elemento.siblings('.resultado').text() );
        $("input#valores_referencia.form-control").val( elemento.siblings('.valores_referencia').text() );

        $("#formEditarExamen").submit(function(event){
            var formData= $("#formEditarExamen").serialize();
            var url = "/examen/" + id_examen + "?flag=resultados";
            $.ajax({
                type: "PATCH",
                url: url,
                data: formData,
                success:function(data){
                    elemento.siblings('.unidades').text(data.unidades);
                    elemento.siblings('.resultado').text(data.resultado);
                    elemento.siblings('.valores_referencia').text(data.valores_referencia);
                    
                }
            });
            //console.log(url);
            id_examen = ""
            return false;
        });
    });   });