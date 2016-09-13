angular.module('appOperator',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('RegistrarPaciente',{
				url: '/RegistrarPaciente',
				templateUrl: 'views/operario/registrarPaciente.html',
				controller:'ctrlRegp'
			})
			.state('RegistrarMuestra',{
				url: '/RegistrarMuestra',
				templateUrl: 'views/operario/registrarMuestra.html',
                        controller:'ctrlRegm'
			})
			.state('Reportes',{
				url: '/Reportes',
				templateUrl: 'views/operario/reportes.html',
                controller:'ctrlReporte'
			});
		$urlRouterProvider.otherwise('RegistrarPaciente');
	})
	.controller('ctrlRegp',function($scope, $state, $http){
		$scope.nuevo_paciente = {};
        $scope.pacientes = {};
        $scope.laboratorios = {};
        $scope.centros = {};
        $scope.editar_paciente = {};
        $scope.disEditPaciente = true;

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

        $scope.editar = function ( pid ) {
            var paciente = $scope.pacientes[pid];
            $scope.editar_paciente = paciente;
            $scope.disEditPaciente = false;
            $('#modal1').openModal();
        };


        $scope.put = function () {
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
                $scope.disEditPaciente = true; //se desactiva el formulario de editar para evitar caida del servidor
                $('#modal1').closeModal();
                Materialize.toast(data.message, 3000, 'rounded')
            }, function (error) {
            });
            
        };

        $scope.delete = function ( pid ) {
            var paciente = $scope.pacientes[pid];
            $http.delete("/paciente/"+ paciente._id)
                .success(function (data) {
                    $scope.pacientes.splice(pid, 1);
                    Materialize.toast(data.message, 3000, 'rounded')
                });
        };

        
        $('.collapsible').collapsible({
	      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

	})
    .controller('ctrlReporte',function($scope, $state, $http){

    })
	.controller('ctrlRegm',function($scope, $state, $http){
	    $scope.pacientes = {};
        $scope.laboratorios = {};
        $scope.centros = {};
        $scope.muestras = {};
        $scope.tipos = ["sangre","heces","orina"];
        $scope.editar_muestra = {};
        $scope.nuevo_muestra = {};

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
            $http.put("/muestra/" + $scope.editar_muestra._id, { 
                tipo: $scope.editar_muestra.tipo,
                paciente: $scope.editar_muestra.paciente,
                laboratorio: $scope.editar_muestra.laboratorio,
                centro: $scope.editar_muestra.centro,
            }
            ).success(function (response) {
                $scope.editar_muestra = {}; //se resetea la variable editar paciente para que no se siga editando
                $scope.disEditMuestra = true; //se desactiva el formulario de editar para evitar caida del servidor
                $('#modal1').closeModal();
                Materialize.toast(data.message, 3000, 'rounded')
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

        $scope.deleteMuestra = function ( pid ) {
            var muestra = $scope.muestras[pid];
            $http.delete("/muestra/"+ muestra._id)
                .success(function (response) {
                    $scope.muestras.splice(pid, 1);
                    Materialize.toast(response.message, 3000, 'rounded');
                });
        };

        $scope.activarInfo = function(){
        	$('select').material_select();
        }

        $scope.editMuestra = function ( pid ) {
            var muestra = $scope.muestras[pid];
            $scope.editar_muestra = muestra;
            $scope.disEditMuestra = false;
            $scope.activarInfo();
            $('#modal1').openModal();
        };

        $scope.cargarPaciente = function (paciente){
            //var paciente = $scope.pacientes[i];
            $scope.nuevo_muestra.paciente = paciente;
            $('#modalPac').closeModal();
        }

        $scope.cargarCentro = function (centro){
            //var centro = $scope.centros[i];
            $scope.nuevo_muestra.centro = centro;
            $('#modalCentro').closeModal();
        }

        $scope.cargarLaboratorio = function (laboratorio){
            //var laboratorio = $scope.laboratorios[i];
            $scope.nuevo_muestra.laboratorio = laboratorio;
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



        $('.collapsible').collapsible({
	      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

        $('#tabol').DataTable();
	})