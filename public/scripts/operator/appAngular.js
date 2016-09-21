angular.module('appOperator',['ui.router', 'nvd3', 'ui.select', 'ngSanitize'])
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
            .state('reportesMensuales',{
                url: '/reportesMensuales',
                templateUrl: 'views/operario/muestras-mensuales.html',
                controller:'controllerReportesMensuales'
            })
            .state('reportesTotales',{
                url: '/reportesTotales',
                templateUrl: 'views/operario/muestras-totales.html',
                controller:'controllerReportesTotales'
            });
		$urlRouterProvider.otherwise('pacientes');
	})

	.controller('controllerPacientes', function($scope, $state, $http){
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

        $scope.cancelar = function(){
            render('operario');
            $state.go('pacientes');
        }
        $scope.cerrarMod = function(){
            $('#modalEditarPaciente').closeModal();
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

    .controller('controllerReportesMensuales', function($scope, $state, $http){

        $scope.laboratorios = {};
        $scope.meses = {}; //Todos los meses tal y como llegan de la BDD
        $scope.data2 = []; //laboratorios en formato [{key: nombreLaboratorio, y: numeroMuestras},...]
        //console.log("asdasdasd");
        //funcion que carga los laboratorios de la BDD
        $http.get("/laboratorios/muestras/2/"+"2016,01,01"+"/"+"2016,09,03")
            .then(function (response) {
                $scope.meses = response.data;

                $http.get("/laboratorios")
                    .then(function (response) {
                        $scope.laboratorios = response.data;
                        $scope.cargarLaboratorios();
                        $scope.cargarData();

                    }
                );
                
            }
        );

        

        $scope.cargarLaboratorios = function() {
            angular.forEach($scope.laboratorios, function(lab){
                $scope.data2.push({"key": lab.nombre, "values": {} });
            });
        };

        $scope.cargarData = function(){
            angular.forEach($scope.meses , function(mes){
                console.log("\n");
                console.log($scope.meses.indexOf(mes));
                angular.forEach(mes, function(lab){

                    //if ($scope.data2.) {}


                    console.log(lab.nombre);
                    console.log(lab.muestras.length);
                    
                });       
            });
        }

        $scope.options = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 45
                },
                clipEdge: true,
                duration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Meses',
                    showMaxMin: false,
                    tickFormat: function(d){
                        var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                        return meses[d];
                    }
                },
                yAxis: {
                    axisLabel: 'Muestras',
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format(',.0f')(d);
                    }
                }
            }
        };

        $scope.data = [
        {
            "key": "Lab1",
            "values": [{
                "x": 0,
                "y": 1
            }, {
                "x": 1,
                "y": 2
            }, {
                "x": 2,
                "y": 4
            },{
                "x": 3,
                "y": 4
            }]
        }, {
            "key": "Lab2",
            "values": [{
                "x": 0,
                "y": 3
            }, {
                "x": 1,
                "y": 2
            }, {
                "x": 2,
                "y": 3
            },{
                "x": 3,
                "y": 4
            }]
        }, {
            "key": "Lab3",
            "values": [{
                "x": 0,
                "y": 3
            }, {
                "x": 1,
                "y": 2
            }, {
                "x": 2,
                "y": 0
            },{
                "x": 3,
                "y": 4
            }]
        }];


    })
    .controller('controllerReportesTotales', function($scope, $state, $http){

        $scope.laboratorios = {}; //Todos los laboratorios tal y como llegan de la BDD
        $scope.data = []; //laboratorios en formato [{key: nombreLaboratorio, y: numeroMuestras},...]

        //funcion que carga los laboratorios de la BDD
        $http.get("/laboratorios")
            .then(function (response) {
                $scope.laboratorios = response.data;
                $scope.cargarData();
            }
        );


        $scope.cargarData = function() {
            angular.forEach($scope.laboratorios, function(lab){
                $scope.data.push({key: lab.nombre, y: lab.muestras.length});
            });
        };

        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
    })

	.controller('controllerMuestras',function($scope, $state, $http){
	    $scope.pacientes = {};
        $scope.laboratorios = {};
        $scope.centros = {};
        $scope.muestras = {};


        $scope.editar_muestra = {};
        $scope.nuevo_muestra = {};


        $scope.tipos = ["sangre","heces","orina"];

        $scope.nuevo_muestra.tipo = { value: $scope.tipos[0] };

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
                tipo: $scope.nuevo_muestra.tipo.value,
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

        $scope.cerrarModCM = function(){
            $('#modalCentro').closeModal();
        };

        $scope.cerrarModLab = function(){
            $('#modalLab').closeModal();
        };

        $scope.cerrarModPac = function(){
            $('#modalPac').closeModal();
        }

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
