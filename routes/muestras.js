var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Muestra = require('../models/Muestra.js');
module.exports = router; 

//Get
router.get('/muestras', function(req, res, next){
	Muestra.find(function(err, muestras){
		if(err){
			return next(err);
		}
		res.json(muestras);
	});
});

//Post
router.post('/muestra', function(req, res, next){
	var muestra = new Muestra(req.body);

	muestra.save(function(err, muestra){
		if(err){
			return next(err);
		}
		res.json(muestra);
	});
});

//Put
router.put('/muestra/:id', function(req, res){
	Muestra.findById(req.params.id, function(err, muestra){
		muestra.tipo = req.body.tipo;
		muestra.nombre = req.body.nombre;
		muestra.cod_barras= req.body.cod_barras;

		muestra.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(muestra);
		});
	});
});

//Delete
router.delete('/muestra/:id', function(req, res, next){
	Muestra.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensaje: 'la muestra se elimino'});
	});
});