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
            })
            .state('modal', {
                url: '/modal',
                templateUrl: 'views/paciente/modal.html',
                controller: 'ctrlModal'
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


        comun.mostrarInfo = function(cm){
            return $http.get('/centroMed/' + cm._id)
            .success(function(data){
                angular.copy(data, comun.centros_med)
                return comun.centros_med
            })
        }

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

        
        comun.updateDatos = function(nuevosDatos){
            return $http.put('/paciente/datos/', nuevosDatos)
            .success(function(data){
                var indice = comun.datos.indexOf(nuevosDatos);
                comun.datos[indice] = data;
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
        

        $scope.actualizar = function() {
           comun.updateDatos($scope.datos);
           $state.go('centros');
            
        }
        $scope.regresar = function() {
            $state.go('modal');    
        }

    })
    .controller('ctrlExamenes', function($scope, $state, comun) {
        //cargarCentrosMed();
        comun.getExamenes();
        $scope.examenes = comun.examenes;  
    })
    .controller('ctrlCentros', function($scope, $state, comun) {
        comun.getCentros();
        $scope.centros = comun.centros_med;
        $scope.actual = {};

        $scope.procesar = function(actual) {
            comun.actual = actual;
            $state.go('modal');
        }

    })
    .controller('ctrlModal', function($scope, $state, comun) {
        //cargarCentrosMed();
        $scope.actual = comun.actual; 

        $scope.informacion = function(){
            comun.mostrarInfo($scope.actual);
        }

        $(document).ready(function(){
            $('.carousel').carousel();
        });
    })
    .controller('TNTIndexController', function ($scope, comun) {
        $scope.gridOptions = {
            enableGridMenu: true
        }
        comun.getDatos();
        $scope.gridOptions.data = [{"nombre":comun.datos.nombre,"apellido":comun.datos.apellido,"examenes":comun.datos.examenes}];
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