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
    .controller('ctrlCargar', function($scope, $state, $http, dataService) {
        $scope.muestras = {};
        $scope.examenes = {};
        $scope.edita = {};
        $scope.examen_id = "";

        $http.get("/muestras")
            .then(function (response) {
                $scope.muestras = response.data;
            }
        );

        $scope.cargarExamenes = function(id) {
            dataService.setProperty(id);
            console.log(dataService.getProperty());
            $state.go('editar');
        }

    })
    .controller('ctrlEditar',function($scope, $state, $http, dataService){

        $scope.muestras = {};
        $scope.examenes = {};
        $scope.edita = {};
        $scope.examen_id = "";
        $scope.isDisabled = true;
        $scope.nuevo_resultado = {};
        
        $scope.examenes = {};
        id = dataService.getProperty();
        var url =  "/muestra/"+id+"/examenes";

        $scope.abrir = function(){
            $('#modal1').openModal();
        }
        $scope.openAdd = function(){
            $('#modal2').openModal();
        }
        $scope.closeAdd = function(){
            $('#modal2').closeModal();
        }

        $scope.delete = function ( pid, cid ) {
            var resultado = $scope.examenes[pid].resultados[cid];
            $http.delete("/resultado/"+ resultado._id)
                .then(function () {
                    $scope.examenes[pid].resultados.splice(cid, 1);
                });
        }

        //Metodo que carga los valores de un resultado al formulario
        $scope.editar = function ( pid, cid ) {

            var resultado = $scope.examenes[pid].resultados[cid];

            $scope.edita = resultado;
            console.log($scope.edita);
            $scope.abrir();
        }

        //Metodo que setea el id del examen cuando se va a crear un nuevo resultado
        $scope.setExamen = function ( id ) {
            $scope.examen_id = id;
            $scope.isDisabled = false;
            $scope.openAdd();
        }

        //Metodo que genera el metodo put con los valores del formulario
        $scope.put = function ( resultado) {
          console.log(resultado);
            //var url = 'http://httpbin.org/put';
            $http.put("/resultado/" + resultado._id, { 
                parametro: $scope.edita.parametro,
                resultado: $scope.edita.resultado,
                unidades: $scope.edita.unidades,
                valores_referencia: $scope.edita.valores_referencia 
            }
            ).success(function (response) {
                var indice = $scope.examenes.indexOf(resultado);
                $scope.examenes[indice] = response.data;
            }, function (error) {
                //console.log('an error occurred', error.data);
            });
        }

        $http.get(url)
        .then(function (response) {
            $.each(response.data, function(i, obj) {
                obj["resultados"] = [];
                //var id_examen = obj._id;
                $http.get("/examen/"+obj._id+"/resultados")
                    .then(function (response) {
                        obj["resultados"]= response.data;
                    });
                $scope.examenes = response.data;
            });
        })

        $scope.agregar = function() {
            $http.post("/resultado", {
                examen: $scope.examen_id, 
                parametro: $scope.nuevo_resultado.parametro,
                resultado: $scope.nuevo_resultado.resultado,
                unidades: $scope.nuevo_resultado.unidades,
                valores_referencia: $scope.nuevo_resultado.valores_referencia 
            }).success(function(response){
                $scope.examenes[response.data.examen].resultados.push(response.data);    
            })

            $scope.nuevo_resultado.parametro = '';
            $scope.nuevo_resultado.resultado = '';
            $scope.nuevo_resultado.unidades = '';
            $scope.nuevo_resultado.valores_referencia = '';

            $http.get(url)
        .then(function (response) {
            $.each(response.data, function(i, obj) {
                obj["resultados"] = [];
                //var id_examen = obj._id;
                $http.get("/examen/"+obj._id+"/resultados")
                    .then(function (response) {
                        obj["resultados"]= response.data;
                    });
                $scope.examenes = response.data;
            });
        })
        }
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