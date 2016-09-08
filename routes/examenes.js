var express = require('express');
var router = express.Router();
var Examen = require('../models/Examen.js');
var mongoose = require('mongoose');
var login = require('../routes/login.js');
module.exports = router;


//Muestra todos los examenes del sistema
router.get('/examenes', login.checkAdmin, function(req, res, next){
	Examen.find(function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});

//muestra todos los examenes de una muestra seleccionada
router.get('/muestra/:id/examenes', login.checkLaboratorista, function(req, res, next){
	Examen.find({muestra:req.params.id}, function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});

router.get('/paciente/examenes', login.checkPaciente, function(req, res){
	Examen.find({ paciente: req.session.user._id }, function (err, user) { //Solo pacientes logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "USTED NO ES PACIENTE"});
		} else {
			res.json(user);
		}	
	});
});

//Muestra todos los examenes de un paciente especifico
router.get('/pacientes/:id/examenes', login.checkPaciente, function(req, res, next){
	Examen.find({paciente:req.params.id}, function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});

//crea una muestra para agregar un examen
router.post('/examen', login.checkOperario,function(req, res, next){
	var examen = new Examen({
		//paciente: req.body.paciente,
		muestra: req.body.muestra,
		nombre: req.body.nombre
	});

	examen.save(function(err, examen){
		if (err) {
			return next(err);
		} else {
			res.json(examen);
		}
	});
});

router.put('/examen/:id', login.checkOperario,function(req, res){
	Examen.findById(req.params.id, function(err, examen){
		//examen.paciente = req.body.paciente;
		examen.muestra = req.body.muestra;
		examen.nombre = req.body.nombre;

		examen.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(examen);
		});
	});
});

router.delete('/examen/:id', login.checkOperario,function(req, res){
	Examen.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El examen se ha eliminado'});
	});
});