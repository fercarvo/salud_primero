angular.module('appMuestras',['ui.router'])
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

        $http.get("/muestras")
            .then(function (response) {
                $scope.muestras = response.data;
            }
        );

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
        }

        $scope.estado = function(muestra){
            $scope.observacion = muestra.observacion;
            $scope.muestra = muestra;
            $('#modalEstado').openModal();
        };

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

        //Funcion que crea un resultado en la base de daatos y tambien lo carga en el scope
        $scope.agregarResultado = function(){
            $http.post("/resultado", {
                _examen: $scope.examen._id,
                parametro: $scope.nuevo_resultado.parametro,
                unidades: $scope.nuevo_resultado.unidades,
                resultado: $scope.nuevo_resultado.resultado,
                valores_referencia: $scope.nuevo_resultado.valores_referencia

            }).success(function(response){
                $scope.examen.resultados.push(response);
                Materialize.toast('Se creo un nuevo resultado satisfactoriamente', 3000, 'rounded teal');
                $scope.nuevo_resultado = {};
                $scope.$apply();                    
            });
        };

        $scope.eliminarResultado = function(examen, resultado){
            $http.delete("/resultado/"+ resultado._id)
                .success(function (response) {
                    //$scope.examenes[$scope.examenes.indexOf(examen)].resultados.splice(resultado, 1);
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