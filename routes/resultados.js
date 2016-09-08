var express = require('express');
var router = express.Router();
var Resultado = require('../models/Resultado.js');
var mongoose = require('mongoose');
var login = require('../routes/login.js');

module.exports = router;

//API REST DE EXAMENES
router.get('/resultados', login.checkAdmin, function(req, res, next){
	Resultado.find(function(err, resultados){
		if (err) {
			return next(err);
		}
		res.json(resultados);
	});
});


router.get('/examen/:id/resultados', login.checkLaboratorista, function(req, res, next){
	Resultado.find({examen:req.params.id}, function(err, resultados){
		if (err) {
			return next(err);
		}
		res.json(resultados);
	});
});

router.post('/resultado', login.checkLaboratorista, function(req, res, next){
	var resultado = new Resultado({
		examen: req.body.examen,
		parametro: req.body.parametro,
		resultado: req.body.resultado,
		valores_referencia: req.body.valores_referencia,
		unidades: req.body.unidades
	});

	resultado.save(function(err, resultado){
		if (err) {
			return next(err);
		} else {
			res.json(resultado);
		}
	});
});

router.put('/resultado/:id', login.checkLaboratorista, function(req, res){
	Resultado.findById(req.params.id, function(err, resultado){
		resultado.parametro = req.body.parametro;
		resultado.resultado = req.body.resultado;
		resultado.valores_referencia = req.body.valores_referencia;
		resultado.unidades = req.body.unidades;

		resultado.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(resultado);
		});
	});
});

router.delete('/resultado/:id', login.checkLaboratorista, function(req, res){
	Resultado.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El resultado se ha eliminado'});
	});
});