var express = require('express');
var router = express.Router();
var Laboratorio = require('../models/Laboratorio.js');
var mongoose = require('mongoose');
module.exports = router;

//Get
router.get('/laboratorios', function(req, res, next){
	Laboratorio.find(function(err, laboratorio){
		if(err){
			return next(err);
		}
		res.json(laboratorio);
	});
});

//Post
router.post('/laboratorio', function(req, res, next){
	var lab = new Laboratorio({
		nombre: req.body.nombre,
		direccion: req.body.direccion
	});

	lab.save(function(err, laboratorio){
		if (err) {
			return next(err);
		} else {
			res.json(laboratorio);
		}
	});
});


//Put
router.put('/laboratorio/:id', function(req, res){
	Laboratorio.findById(req.params.id, function(err, laboratorio){
		laboratorio.nombre = req.body.nombre;
		laboratorio.direccion = req.body.direccion;

		laboratorio.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(laboratorio);
		});
	});
});

//Delete
router.delete('/laboratorio/:id', function(req, res, next){
	Laboratorio.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensaje: 'el Laboratorio se elimino'});
	});
});