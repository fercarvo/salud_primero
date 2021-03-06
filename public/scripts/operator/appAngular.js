angular.module('appOperator',['ui.router', 'nvd3', 'ngMaterial'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('pacientes',{
				//url: '/pacientes',
				templateUrl: 'views/operario/pacientes.html',
				controller:'controllerPacientes'
			})
			.state('muestras',{
				//url: '/muestras',
				templateUrl: 'views/operario/muestras.html',
                controller:'controllerMuestras'
			})
            .state('reportesMensuales',{
                //url: '/reportesMensuales',
                templateUrl: 'views/operario/muestras-mensuales.html',
                controller:'controllerReportesMensuales'
            })
            .state('reportesTotales',{
                //url: '/reportesTotales',
                templateUrl: 'views/operario/muestras-totales.html',
                controller:'controllerReportesTotales'
            });
		$urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('pacientes');
        });
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
                Materialize.toast('Se Creó el paciente satisfactoriamente', 3000, 'rounded teal');
                $scope.nuevo_paciente = {};
                $scope.$apply();
                    
            });
        }

        $scope.cancelar = function(){
            $state.reload();
        }

        //boton cerrar de Editar Paaciente
        $scope.cerrarMod = function(){
            $('#modalEditarPaciente').closeModal();
            $state.reload();
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
                Materialize.toast(data.message, 3000, 'teal rounded');
            }, function (error) {
            });
            
        };

        $scope.eliminarPaciente = function ( paciente ) {
            $http.delete("/paciente/"+ paciente._id)
                .success(function (data) {
                    $scope.pacientes.splice($scope.pacientes.indexOf(paciente), 1);
                    Materialize.toast(data.message, 3000, 'rounded teal');
                });
        };

        
        $('.collapsible').collapsible({
	      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

	})

    .controller('controllerReportesMensuales', function($scope, $state, $http){
        $scope.laboratorios = {};
        $scope.meses = {}; //Todos los meses tal y como llegan de la BDD
        $scope.data = []; //laboratorios en formato [{key: nombreLaboratorio, y: numeroMuestras},...]
        $scope.desde = {};
        $scope.hasta = {};

        $scope.months = [
            {nombre: "Enero", numero: 01},
            {nombre: "Febrero", numero: 02},
            {nombre: "Marzo", numero: 03},
            {nombre: "Abril", numero: 04},
            {nombre: "Mayo", numero: 05},
            {nombre: "Junio", numero: 06},
            {nombre: "Julio", numero: 07},
            {nombre: "Agosto", numero: 08},
            {nombre: "Septiembre", numero: 09},
            {nombre: "Octubre", numero: 10},
            {nombre: "Noviembre", numero: 11},
            {nombre: "Diciembre", numero: 12},
        ];
        
        $scope.cargarFecha = function(){
            $scope.data = []; //para que no se monte la data
            $http.get("/laboratorios/muestras/2/2016,"+$scope.desde+",01/2016,"+$scope.hasta+",01")
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
        }
        

        //Funcion que carga todos los laboratorios a los datos
        $scope.cargarLaboratorios = function() {
            angular.forEach($scope.laboratorios, function(lab){
                $scope.data.push({"key": lab.nombre, "values": [] });
            });
        };

        $scope.cargarData = function(){
            var k = 0 //cada mes del arreglo
            for (var i = $scope.desde - 1 ; i <= $scope.hasta - 1; i++) { //cada mes a ser impreso
                for (var j = 0; j < $scope.meses[0].length; j++) { //cada laboratorio
                    $scope.data[j].values.push({
                        "x": i,
                        "y": $scope.meses[k][j].muestras.length
                    });
                    
                }
                k++;
            }
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
                stacked: false,
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
                        return d3.format('d')(d);
                    }
                }
            }
        };

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
                labelType: 'percent',
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


        $scope.tipos = [
            {
                name : "sangre",
                examenes : ["hemograma","bioquimica","serologia"]
            },{
                name : "orina",
                examenes : ["uroanalisis","gota","sangre en la orina"]
            },{
                name : "heces",
                examenes : ["coprocultivo","coproparasitario"]
            }
        ];
        
        $scope.hasChangedExamen = function(){
            $scope.examenes.push({examen: $scope.examen});
            $scope.$apply();
        }

        $scope.hasChangedTipo = function(){
            $scope.examenes = [];
            $scope.$apply();
        }

        //Funcion utilizada para darle formato al chip
        $scope.newChip = function(chip){
            return {examen: chip};
        }

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
            //console.log($scope.editar_muestra);
            $http.put("/muestra/" + $scope.editar_muestra._id, { 
                tipo: $scope.editar_muestra.tipo,
                paciente: $scope.editar_muestra._paciente,
                laboratorio: $scope.editar_muestra._laboratorio,
                centro: $scope.editar_muestra._centro,
            }
            ).success(function (response) {
                $scope.editar_muestra = {}; //se resetea la variable editar paciente para que no se siga editando
                $('#modalEditarMuestra').closeModal();
                Materialize.toast(response.message, 3000, 'rounded teal');
            });
        };

        //Se crea una muestra
        $scope.agregarMuestra = function(muestra) {
            $http.post("/muestra", {
                tipo: $scope.nuevo_muestra.tipo.name,
                paciente: $scope.nuevo_muestra.paciente._id,
                laboratorio: $scope.nuevo_muestra.laboratorio._id,
                centro: $scope.nuevo_muestra.centro._id
            }).success(function(response){
                $scope.muestras.push(response);
                //Se recorren todos los examenes y se crea cada uno
                angular.forEach($scope.examenes, function(obj){
                    //Metodo que crea cada examen
                    $http.post("/examen", {
                        muestra: response._id,
                        nombre: obj.examen
                    }).success( function(response2){
                        Materialize.toast("se creo examen de: " + response2.nombre, 3000, 'rounded teal');
                    } );
                });
                console.log(response);
                
                Materialize.toast("Se Creó la muestra: " + response.cod_barras, 5000, 'rounded teal');
                $scope.nuevo_muestra = {};
                $scope.apply();

            });
            //$state.reload();
        };

        $scope.eliminarMuestra = function ( muestra ) {
            //var muestra = $scope.muestras[pid];
            $http.delete("/muestra/"+ muestra._id)
                .success(function (response) {
                    $scope.muestras.splice($scope.muestras.indexOf(muestra), 1);
                    Materialize.toast(response.message, 3000, 'rounded teal');
                });
        };

        $scope.cancelarMuestra = function(){
            $state.reload();
        }

        $scope.linkNuevoPac = function(){
            //console.log("hola");
            $('#modalPac').closeModal();
            $('#modalEditarMuestra').closeModal();
            $state.go('pacientes');
        }

        $scope.editarMuestra = function ( muestra ) {
            $scope.editar_muestra = muestra;
            $('#modalEditarMuestra').openModal();
        };

        $scope.cargarPaciente = function (paciente){
            //var paciente = $scope.pacientes[i];
            $scope.nuevo_muestra.paciente = paciente;
            $scope.editar_muestra._paciente = paciente;
            $('#modalPac').closeModal();
            //console.log($scope.nuevo_muestra.tipo);
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
            //console.log(tipo);
        };

        $scope.cerrarModCM = function(){
            $('#modalCentro').closeModal();
        };

        $scope.cerrarModLab = function(){
            $('#modalLab').closeModal();
        };

        $scope.cerrarModPac = function(){
            $('#modalPac').closeModal();
            $state.go('muestras');
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
	      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

        $('#tabol').DataTable();
	})
