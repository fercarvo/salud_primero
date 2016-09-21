
angular.module('appPatient', ['ui.router', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter'])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('centros', {
                url: '/centros',
                templateUrl: 'views/paciente/centros.html',
                controller: 'ctrlCentros'
            })
            .state('datos', {
                url: '/datos',
                templateUrl: 'views/paciente/datos.html',
                controller: 'ctrlDatos'
            })
            .state('examenes', {
                url: '/examenes',
                templateUrl: 'views/paciente/examenes.html',
                controller: 'ctrlExamenes'
            });

        $urlRouterProvider.otherwise('centros');
    })
    .factory('comun', function($http) {
        var comun = {};

        comun.centros_med = [];
        comun.datos = {};
        comun.examenes = [];

        nuevosDatos = {};
        comun.actual = {};
        /***Sección de métodos remotos***/

        comun.getCentros = function(){
            return $http.get('/centrosMed')
            .success(function(data){
                angular.copy(data, comun.centros_med)
                return comun.centros_med
            })
        }

        comun.getDatos = function(){
            return $http.get('/paciente/datos')
            .success(function(data){
                angular.copy(data, comun.datos)
                return comun.datos
            })
        }
  
        comun.updateDatos = function(datos){
            return $http.put('/paciente/datos/', {
                nombre : datos.nombre,
                apellido : datos.apellido,
                cedula : datos.cedula,
                direccion : datos.direccion,
                telefono : datos.telefono
            })
            .success(function(data){
                Materialize.toast("Datos Actualizados", 3000, 'rounded');
            })
        }

        comun.getExamenes = function(){
            return $http.get('/paciente/examenes')
            .success(function(data){
                angular.copy(data, comun.examenes)
                return comun.examenes
            })
        }
        return comun;
    })
    .controller('ctrlDatos', function($scope, $state, comun) {
        
        comun.getDatos();
        $scope.datos = comun.datos;
        //$scope.nuevos = comun.nuevosDatos;        
        console.log($scope.datos);

        $scope.actualizar = function() {
           comun.updateDatos($scope.datos);
           $state.go('centros');            
        }
        $scope.regresar = function() {
            comun.getDatos();
            $scope.datos = comun.datos;
            $state.go('centros');    
        }

    })
    .controller('ctrlExamenes', function($scope, $state, comun) {
        comun.getExamenes();
        $scope.examenes = comun.examenes;
        //console.log($scope.examenes);
    })
    .controller('ctrlCentros', function($scope, $state, comun) {
        comun.getCentros();
        $scope.centros = comun.centros_med;
        $scope.actual = {};

        $scope.procesar = function(actual) {
            $('#modalInfo').openModal();             
            comun.actual = actual;
            $scope.actual = comun.actual;          
        }

        $('.carousel.carousel-slider').carousel({full_width: true});
              

    })
    .controller('TNTIndexController', function ($scope, $state, comun) {
        $scope.gridOptions = {
            enableGridMenu: true
        }
        comun.getDatos();
        $scope.datos = comun.datos;

        console.log(comun.datos.nombre);

        /*
        $scope.gridOptions.data = [{
            "nombre": {{nom}},
            "apellido":comun.datos.apellido,
            "examenes":comun.datos.examenes
        }];*/
        //$scope.datos = comun.datos;
        /*$scope.gridOptions.data =[{
            "cliente": "Globalia (Air Europa)",
            "proyecto": "Metodologías ágiles y soporte al desarrollo",
            "tags": "agilismo, iOS"
        },
        {
            "cliente": "Tinsa",
            "proyecto": "Implantación de metodologías ágiles",
            "tags": "agilismo"
        },
        {
            "cliente": "Casa del Libro",
            "proyecto": "TAGUS",
            "tags": "agilismo, plataforma eReader"
        }];*/
    })

