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
				templateUrl: 'views/operario/reportes.html'
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
                foto: $scope.nuevo_paciente.foto
            }).success(function(response){
              $scope.pacientes.push(response.data);
                    
            })
            $state.go('RegistrarPaciente');
            $scope.nuevo_paciente = {};

        }

        $scope.editar = function ( pid ) {
            var paciente = $scope.pacientes[pid];
            $scope.editar_paciente = paciente;
            $scope.disEditPaciente = false;
            $('#modal1').openModal();
            $state.go('RegistrarPaciente');
        };


        $scope.put = function () {
            $http.put("/paciente/" + $scope.editar_paciente._id, { 
                nombre: $scope.editar_paciente.nombre,
                apellido: $scope.editar_paciente.apellido,
                correo: $scope.editar_paciente.correo,
                cedula: $scope.editar_paciente.cedula,
                direccion: $scope.editar_paciente.direccion,
                telefono: $scope.editar_paciente.telefono,
                foto: $scope.editar_paciente.foto 
            }
            ).success(function (response) {
                $scope.editar_paciente = {}; //se resetea la variable editar paciente para que no se siga editando
                $scope.disEditPaciente = true; //se desactiva el formulario de editar para evitar caida del servidor
            }, function (error) {
            });
            $('#modal1').closeModal();
        };

        $scope.delete = function ( pid ) {
            var paciente = $scope.pacientes[pid];
            $http.delete("/paciente/"+ paciente._id)
                .then(function () {
                    $scope.pacientes.splice(pid, 1);
                });
        };

        
        $('.collapsible').collapsible({
	      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

	})
	.controller('ctrlRegm',function($scope, $state, $http){
	    $scope.pacientes = {};
        $scope.laboratorios = {};
        $scope.centros = {};

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
                cod_barras: $scope.editar_muestra.cod_barras,
                paciente: $scope.editar_muestra.paciente,
                laboratorio: $scope.editar_muestra.laboratorio,
                centro: $scope.editar_muestra.centro,
            }
            ).success(function (response) {
                $scope.editar_muestra = {}; //se resetea la variable editar paciente para que no se siga editando
                $scope.disEditMuestra = true; //se desactiva el formulario de editar para evitar caida del servidor
            }, function (error) {
            });
            $state.go('RegistrarMuestra');
        };

        //Se crea un paciente
        $scope.agregarMuestra = function() {
            $http.post("/muestra", {
                tipo: $scope.nuevo_muestra.tipo,
                cod_barras: $scope.nuevo_muestra.cod_barras,
                paciente: $scope.nuevo_muestra.paciente,
                laboratorio: $scope.nuevo_muestra.laboratorio,
                centro: $scope.nuevo_muestra.centro,
            }).success(function(response){
              $scope.muestras.push(response.data);
                    
            })
                $scope.nuevo_muestra = {};
            $state.go('RegistrarMuestra');
        }

        $scope.deleteMuestra = function ( pid ) {
            var muestra = $scope.muestras[pid];
            $http.delete("/muestra/"+ muestra._id)
                .then(function () {
                    $scope.muestras.splice(pid, 1);
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
            $state.go('RegistrarMuestra');
        };

        $('.collapsible').collapsible({
	      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });

        $('#tabol').DataTable();
	})