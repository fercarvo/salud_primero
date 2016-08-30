var express = require('express');
var router = express.Router();
var Examen = require('../models/Examen.js');
var mongoose = require('mongoose');
module.exports = router;

//API REST DE EXAMENES
router.get('/examenes', function(req, res, next){
	Examen.find(function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});


router.get('/muestra/:id/examenes', function(req, res, next){
	Examen.find({muestra:req.params.id}, function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});

router.get('/paciente/:id/examenes', function(req, res, next){
	Examen.find({paciente:req.params.id}, function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});


router.post('/examen', function(req, res, next){
	var examen = new Examen({
		paciente: req.body.paciente,
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

router.put('/examen/:id', function(req, res){
	Examen.findById(req.params.id, function(err, examen){
		examen.paciente = req.body.paciente;
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

router.delete('/examen/:id', function(req, res){
	Examen.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El examen se ha eliminado'});
	});
});