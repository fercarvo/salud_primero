angular.module('appOperator',['ui.router', 'nvd3'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('pacientes',{
				url: '/pacientes',
				templateUrl: 'views/operario/pacientes.html',
				controller:'controllerPacientes'
			})
			.state('muestras',{
				url: '/muestras',
				templateUrl: 'views/operario/muestras.html',
                controller:'controllerMuestras'
			})
			.state('reportes',{
				url: '/reportes',
				templateUrl: 'views/operario/reportes.html',
                controller:'controllerReportes'
			});
		$urlRouterProvider.otherwise('pacientes');
	})
	.controller('controllerPacientes',function($scope, $state, $http){
		$scope.nuevo_paciente = {};
        $scope.pacientes = {};
        $scope.laboratorios = {};
        $scope.centros = {};
        $scope.editar_paciente = {};

        $http.get("/pacientes")
            .then(function (response) {
                $scope.pacientes = response.data;
            }
        );

		//Se crea un paciente
        $scope.agregar = function() {
            $http.post("/paciente", {
                nombre: $scope.nuevo_paciente.nombre,
                apellido: $scope.nuevo_paciente.apellido,
                correo: $scope.nuevo_paciente.correo,
                cedula: $scope.nuevo_paciente.cedula,
                direccion: $scope.nuevo_paciente.direccion,
                telefono: $scope.nuevo_paciente.telefono,
            }).success(function(response){

                $scope.pacientes.push(response);
                Materialize.toast('Se Creó el paciente satisfactoriamente', 3000, 'rounded');
                $scope.nuevo_paciente = {};
                $scope.$apply();
                    
            });
            
        }

        $scope.editarPaciente = function ( paciente ) {
            $scope.editar_paciente = paciente;
            $('#modalEditarPaciente').openModal();
        };


        $scope.putPaciente = function () {
            $http.put("/paciente/" + $scope.editar_paciente._id, { 
                nombre: $scope.editar_paciente.nombre,
                apellido: $scope.editar_paciente.apellido,
                correo: $scope.editar_paciente.correo,
                cedula: $scope.editar_paciente.cedula,
                direccion: $scope.editar_paciente.direccion,
                telefono: $scope.editar_paciente.telefono
            }
            ).success(function (data) {
                $scope.editar_paciente = {}; //se resetea la variable editar paciente para que no se siga editando
                $('#modalEditarPaciente').closeModal();
                Materialize.toast(data.message, 3000, 'rounded')
            }, function (error) {
            });
            
        };

        $scope.eliminarPaciente = function ( paciente ) {
            $http.delete("/paciente/"+ paciente._id)
                .success(function (data) {
                    $scope.pacientes.splice($scope.pacientes.indexOf(paciente), 1);
                    Materialize.toast(data.message, 3000, 'rounded')
                });
        };

        
        $('.collapsible').collapsible({
	      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

	})
    .controller('controllerReportes',function($scope, $state, $http){
        $scope.options = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 50
                },
                x: function(d){return d[0];},
                y: function(d){return d[1]/100000;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                duration: 100,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        $scope.data = [
            {
                "key" : "Quantity" ,
                "bar": true,
                "values" : [
                    [ 1136005200000 , 1271000.0],
                    [ 1138683600000 , 1271000.0],
                    [ 1141102800000 , 1271000.0],
                    [ 1143781200000 , 0],
                    [ 1146369600000 , 0],
                    [ 1149048000000 , 0],
                    [ 1151640000000 , 0],
                    [ 1154318400000 , 0],
                    [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
            }];
    })
	.controller('controllerMuestras',function($scope, $state, $http){
	    $scope.pacientes = {};
        $scope.laboratorios = {};
        $scope.centros = {};
        $scope.muestras = {};
        $scope.tipos = ["sangre","heces","orina"];
        $scope.select_tipo = "";
        $scope.editar_muestra = {};
        $scope.nuevo_muestra = {};

        $scope.seleccionar = function(obj){
            alert(obj);
            $state.go('reportes');
        }

        $http.get("/muestras")
            .then(function (response) {
                $scope.muestras = response.data;
            }
        );

        $http.get("/pacientes")
            .then(function (response) {
                $scope.pacientes = response.data;
            }
        );

        $http.get("/laboratorios")
            .then(function (response) {
                $scope.laboratorios = response.data;
            }
        );

        $http.get("/centrosMed")
            .then(function (response) {
                $scope.centros = response.data;
            }
        );


        $scope.putMuestra = function () {
            console.log($scope.editar_muestra);
            $http.put("/muestra/" + $scope.editar_muestra._id, { 
                tipo: $scope.editar_muestra.tipo,
                paciente: $scope.editar_muestra._paciente,
                laboratorio: $scope.editar_muestra._laboratorio,
                centro: $scope.editar_muestra._centro,
            }
            ).success(function (response) {
                $scope.editar_muestra = {}; //se resetea la variable editar paciente para que no se siga editando
                $scope.disEditMuestra = true; //se desactiva el formulario de editar para evitar caida del servidor
                $('#modalEditarMuestra').closeModal();
                Materialize.toast(response.message, 3000, 'rounded')
            });
        };

        //Se crea una muestra
        $scope.agregarMuestra = function(muestra) {
            console.log($scope.nuevo_muestra);

            $http.post("/muestra", {
                tipo: $scope.nuevo_muestra.tipo,
                paciente: $scope.nuevo_muestra.paciente._id,
                laboratorio: $scope.nuevo_muestra.laboratorio._id,
                centro: $scope.nuevo_muestra.centro._id

            }).success(function(response){
                $scope.muestras.push(response);
                Materialize.toast('Se Creó una muestra satisfactoriamente', 3000, 'rounded');
                $scope.nuevo_muestra = {};
                $scope.$apply();  
            });
        };

        $scope.eliminarMuestra = function ( muestra ) {
            //var muestra = $scope.muestras[pid];
            $http.delete("/muestra/"+ muestra._id)
                .success(function (response) {
                    $scope.muestras.splice($scope.muestras.indexOf(muestra), 1);
                    Materialize.toast(response.message, 3000, 'rounded');
                });
        };



        $scope.editarMuestra = function ( muestra ) {
            $scope.editar_muestra = muestra;
            //$scope.disEditMuestra = false;
            //$scope.activarInfo();
            $('#modalEditarMuestra').openModal();
        };

        $scope.cargarPaciente = function (paciente){
            //var paciente = $scope.pacientes[i];
            $scope.nuevo_muestra.paciente = paciente;
            $scope.editar_muestra._paciente = paciente;
            $('#modalPac').closeModal();
        }

        $scope.cargarCentro = function (centro){
            //var centro = $scope.centros[i];
            $scope.nuevo_muestra.centro = centro;
            $scope.editar_muestra._centro = centro;
            $('#modalCentro').closeModal();
        }

        $scope.cargarLaboratorio = function (laboratorio){
            //var laboratorio = $scope.laboratorios[i];
            $scope.nuevo_muestra.laboratorio = laboratorio;
            $scope.editar_muestra._laboratorio = laboratorio;
            $('#modalLab').closeModal();
        }

        $scope.setTipo = function(obj){
            var tipo = $scope.tipo[obj];
            console.log(tipo);
        };

        $scope.modalPaciente = function(){
            $('#modalPac').openModal();
        };

        $scope.modalLaboratorio = function(){
            $('#modalLab').openModal();
        };

        $scope.modalCentroMed = function(){
            $('#modalCentro').openModal();
        };

        $scope.activarSelect = function(){
            $('select').material_select();
        }

        $('.collapsible').collapsible({
	      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

        $('#tabol').DataTable();
	})
