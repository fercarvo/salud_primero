var express = require('express');
var router = express.Router();


//CREANDO METODOS PARA EL API REST
var mongoose = require('mongoose');

var Paciente = mongoose.model('Paciente');
var Examen = mongoose.model('Examen'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//API REST DE EXAMENES
router.get('/examenes', function(req, res, next){
	Examen.find(function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});


router.post('/examen', function(req, res, next){
	var examen = new Examen(req.body);

	examen.save(function(err, examen){
		if (err) {
			return next(err);
		}
		res.json(examen);
	});
});

router.put('/examen/:id', function(req, res){
	Examen.findById(req.params.id, function(err, examen){
		examen.paciente = req.body.paciente;
		examen.muestra = req.body.muestra;
		examen.laboratorio = req.body.laboratorio;
		examen.centroMedico = req.body.centroMedico;
		examen.estado = req.body.estado;

		examen.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(examen);
		});
	});
});

router.delete('/examen/:id', function(req, res){
	Examen.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El examen se ha eliminado'})
	})
});


//API REST DE PACIENTES
router.get('/pacientes', function(req, res, next){
	Paciente.find(function(err, pacientes){
		if(err){
			return next(err);
		}
		res.json(pacientes);
	});
});

router.post('/paciente', function(req, res, next){
	var paciente = new Paciente(req.body);

	paciente.save(function(err, paciente){
		if (err) {
			return next(err);
		}
		res.json(paciente);
	});
});

router.put('/paciente/:id', function(req, res){
	Paciente.findById(req.params.id, function(err, paciente){
		paciente.nombre = req.body.nombre;
		paciente.apellido = req.body.apellido;
		paciente.cedula = req.body.cedula;
		paciente.correo = req.body.correo;
		paciente.direccion = req.body.direccion;
		paciente.telefono = req.body.telefono;
		paciente.foto = req.body.foto;
		paciente.clave = req.body.clave;

		paciente.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(paciente);
		});
	});
});

router.delete('/paciente/:id', function(req, res){
	Paciente.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El paciente se ha eliminado'})
	})
});


module.exports = router;
