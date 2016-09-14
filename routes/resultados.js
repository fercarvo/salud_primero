var express = require('express');
var router = express.Router();
var Resultado = require('../models/Resultado.js');
var Examen = require('../models/Examen.js');
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


router.get('/examenes/:id/resultados', login.checkLaboratorista, function(req, res, next){
	Resultado.find({examen:req.params.id}, function(err, resultados){
		if (err) {
			return next(err);
		}
		res.json(resultados);
	});
});

router.post('/resultado', login.checkLaboratorista, function(req, res, next){
	var resultado = new Resultado({
		_examen: req.body._examen,
		parametro: req.body.parametro,
		resultado: req.body.resultado,
		valores_referencia: req.body.valores_referencia,
		unidades: req.body.unidades
	});


	Examen.findOne({ _id: req.body._examen}, function(err, examen){
		if (!examen) {
			res.json({message: "_examen no existe"});
		} else {
			examen.resultados.push(resultado);
			examen.save();

			resultado.save(function(err, doc){
				if (err) {
					return next(err);
				} else {
					res.json(doc);
				}
			});
		}		
	});

});

router.put('/resultados/:id', login.checkLaboratorista, function(req, res){
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

router.delete('/resultados', login.checkLaboratorista, function(req, res){
	Resultado.remove({}, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'Todos los resultados se han eliminado'});
	});
});