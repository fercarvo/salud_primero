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

        $http.get("/muestras")
            .then(function (response) {
                $scope.muestras = response.data;
            }
        );

        $scope.cargarExamenes = function(muestra) {
            comun.muestra = muestra;
            $state.go('examenes');
        }

        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });

    })
    .controller('controllerExamenes',function($scope, $state, $http, comun){
        $scope.examenes = {};
        $scope.muestra = comun.muestra;

        $http.get("/muestra/"+ comun.muestra._id +"/examenes")
            .then(function (response) {
                $scope.examenes = response.data;
            }
        );

        $('.collapsible').collapsible({
            accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });

    })