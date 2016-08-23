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
		examen.parametro = req.body.parametro;
		examen.unidades = req.body.unidades;
		examen.resultado = req.body.resultado;
		examen.valores_referencia = req.body.valores_referencia;

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


router.patch('/examen/:id', function(req, res){
	console.log(req.query.flag);
	if (req.query.flag=="resultados") {
		Examen.findById(req.params.id, function(err, examen){
			examen.unidades = req.body.unidades;
			examen.resultado = req.body.resultado;
			examen.valores_referencia = req.body.valores_referencia;
			examen.save(function(err){
				if(err){
					res.send(err);
				}
				res.json(examen);
			});
		});	
	} else if (req.query.flag=="paciente") {
		Examen.findById(req.params.id, function(err, examen){
			examen.paciente = req.body.paciente;
			examen.save(function(err){
				if(err){
					res.send(err);
				}
				res.json(examen);
			});
		});	
	} else {
		res.send({error: "ingrese bien la URL"});
	}



	
});