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
	.service('dataService', function() {
	  // private variable
	  var _dataObj = 0;

	  return {
            getProperty: function () {
                return _dataObj;
            },
            setProperty: function(value) {
                _dataObj = value;
            }
        };})
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
    //console.log("se cargo");
    //metodo que al hacer clic en examenes de una muestra, carga todos los examenes de esta
    
    /*
    $('.examenes_muestra').click(function() {
        console.log("entro al click");
    //$('body').on('click', '.examenes_muestra', function () {
        var html = "";
        var elemento = $(this);
        var id_muestra = $(this).siblings('.id_muestra').text();
        var url = "/muestra/" + id_muestra + "/examenes";

        $.ajax({
            type: 'GET', 
            url: url, 
            data: {}, 
            success: function(data){
                $.each(data, function(i, obj) {
                    var id_examen = obj._id;
                    var parametro = obj.parametro ;
                    var unidades = obj.unidades;
                    var resultado = obj.resultado;
                    var valores_referencia = obj.valores_referencia;

                    $( "#tabla-body-examenes" ).html(function() {
                        html = html + "<tr >\n";
                        html = html + "<td class='id_examen' style='display:none;'>" + id_examen + "</td>\n";
                        html = html + "<td class='parametro'>" + parametro + "</td>\n";
                        html = html + "<td class='unidades'>" + unidades + "</td>\n";
                        html = html + "<td class='resultado'>" + resultado + "</td>\n";
                        html = html + "<td class='valores_referencia'>" + valores_referencia + "</td>\n";
                        html = html + "<td class= 'editar'><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modalEditarExamen'>editar</button></td>\n";
                        html = html + "</tr>\n";
                        return html;
                    });                         
                });
            }
        });
    });

    */

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