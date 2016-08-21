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


//GET - listar pacientes
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


module.exports = router;
