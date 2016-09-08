angular.module('appPatient', ['ui.router','ui.grid', 'ui.grid.selection','ui.grid.exporter'])
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
        $scope.gridOptions = function(){
            enableGridMenu: true;
        }
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




/*angular.module('appExportarToPDF',['ui.router']
    .controller('exportarToPdf',function($scope)){
                
                }

(function(){
    //export html table to pdf, excel and doc format directive
    var exportTable = function(){
        var link = function($scope, elm, attr){
            $scope.$on(‘export-pdf’, function(e, d){
                elm.tableExport({type:’pdf’, escape:’false’});
            });
            $scope.$on(‘export-excel’, function(e, d){
                elm.tableExport({type:’excel’, escape:false});
            });
            $scope.$on(‘export-doc’, function(e, d){
                elm.tableExport({type: ‘doc’, escape:false});
            });
        }
        return {
            restrict: ‘C’,
            link: link
        }
    }
    angular.module(‘CustomDirectives’, [])
        .directive(‘exportTable’, exportTable);
})();

//controlador
$scope.exportAction = function(){
    switch($scope.export_action){
        case ‘pdf’: $scope.$broadcast(‘export-pdf’, {});
            break;
        case ‘excel’: $scope.$broadcast(‘export-excel’, {});
            break;
        case ‘doc’: $scope.$broadcast(‘export-doc’, {});
            break;
        default: console.log(‘no event caught’);
    }
}
=======

    })

>>>>>>> wjvelez*/
