angular.module('appMuestras',['ui.router', 'ngTable', 'ngMaterial'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('muestras',{
                url: '/muestras',
                templateUrl: 'views/laboratorista/muestras.html',
                controller: 'controllerMuestras'
            })
            .state('examenes',{
                url: '/examenes',
                templateUrl: 'views/laboratorista/examenes.html',
                controller: 'controllerExamenes'
            })
        $urlRouterProvider.otherwise('muestras');
    })

    .factory('comun', function($http){
        var comun = {};
        comun.muestra = {};

        return comun;
    })
  
    .controller('controllerMuestras', function($scope, $state, $http, comun) {

        $scope.muestras = {};
        $scope.muestra = {};
        //$scope.check = true;

        $http.get("/muestras")
            .then(function (response) {
                $scope.muestras = response.data;
            }
        );

        //Funcion que checkea el icono si este es distinto de registrado
        $scope.cargarEstado = function(muestra){
            if (muestra.estado == "registrada") {
                return false;    
            } else {
                muestra.model = true;
                return true;
            }
        }

        //Funcion que bloquea el boton si su estado es distinto de registrado
        $scope.bloquearCheck = function(muestra){
            if (muestra.estado == "registrada") {
                return false;    
            } else {
                return true;
            }
        }

        //Funcion que cambia el estado de la muestra en la BDD 
        $scope.cambiarEstado = function(muestra){
            if (muestra.estado == "registrada") {
                $http.put("/muestra/"+ muestra._id +"/estado/proceso", {})
                .success(function(response){
                    Materialize.toast(response.message, 3000, 'rounded teal');
                    $scope.muestra.observacion = $scope.observacion;
                    //$scope.apply();                   
                });    
            }
        }   

        $scope.cargarExamenes = function(muestra) {
            comun.muestra = muestra;
            $state.go('examenes');
        }

        $scope.actualizarObservacion = function (){
            $http.put("/muestra/" + $scope.muestra._id + "/observacion", {
                observacion: $scope.observacion
            }).success(function(response){
                Materialize.toast(response.message, 3000, 'rounded teal');
                $scope.muestra.observacion = $scope.observacion;
                //$scope.$apply();                    
            });
            $('#modalEstado').closeModal();
        }

        $scope.cerrarComent = function(){
            $('#modalEstado').closeModal();
        }

        $scope.obs = function(muestra){
            $scope.observacion = muestra.observacion;
            $scope.muestra = muestra;
            $('#modalEstado').openModal();
        };

        $('#obs').val('New Text');
        $('#obs').trigger('autoresize');

        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });

    })
    .controller('controllerExamenes',function($scope, $state, $http, comun){
        $scope.examenes = {};
        $scope.muestra = comun.muestra;
        $scope.examen = {};
        $scope.nuevo_resultado = {};

        //Se cargan todos los examenes al scope
        $http.get("/muestra/"+ comun.muestra._id +"/examenes")
            .then(function (response) {
                $scope.examenes = response.data;
            }
        );

        //Funcion que activa el modal de crear resultado y guarda el examen de donde se creo
        $scope.nuevoResultado = function(examen){
            $('#modalCrearResultado').openModal();
            $scope.examen = examen;
        };


        //No agrega un resultado...limpia el formulario
        $scope.cancelarRes = function(){
            $('#modalCrearResultado').closeModal();
        }


        //Funcion que crea un resultado en la base de daatos y tambien lo carga en el scope
        $scope.agregarResultado = function(){
            $http.post("/resultado", {
                _examen: $scope.examen._id,
                parametro: $scope.nuevo_resultado.parametro,
                unidades: $scope.nuevo_resultado.unidades,
                resultado: $scope.nuevo_resultado.resultado,
                valores_referencia: $scope.nuevo_resultado.valores_referencia

            }).success(function(response){
                $http.put("/muestra/"+ response[0]._examen._muestra +"/estado/finalizado", {})
                .success(function(response2){
                    $scope.examen.resultados.push(response[0]);
                    Materialize.toast('Resultado agregado satisfactoriamente', 3000, 'rounded teal');
                    $scope.nuevo_resultado = {};
                    $scope.$apply();
                });
                       
            });
            $('#modalCrearResultado').closeModal();
        };

        $scope.eliminarResultado = function(examen, resultado){
            $http.delete("/resultado/"+ resultado._id)
                .success(function (response) {
                    examen.resultados.splice(examen.resultados.indexOf(resultado), 1);
                    Materialize.toast(response.message, 3000, 'rounded teal');
                    $scope.$apply(); 
                });
        }

        //Activa el acordeon
        $('.collapsible').collapsible({
            accordion : false
        });

    })