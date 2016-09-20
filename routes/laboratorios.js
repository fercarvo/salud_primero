var express = require('express');
var router = express.Router();
var Laboratorio = require('../models/Laboratorio.js');
var mongoose = require('mongoose');
var login = require('../routes/login.js');
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

//Retorna los laboratorios con sus respectivas muestras filtradas x fecha {desde: AAAA-MM-DD, hasta:AAAA-MM-DD}
router.get('/Laboratorios/muestras/:desde/:hasta', login.checkOperario, function(req, res, next){
	Laboratorio.find({})
	.populate('muestras',null, {fecha: {$gte: req.params.desde, $lt: req.params.hasta}})
	.exec(function(err, docs){
		if(err){
			return next(err);
		}
		res.json(docs);
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

router.delete('/laboratorios', function(req, res, next){
	Laboratorio.remove({}, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensagee: 'los laboratorios se eliminaron'});
	});
});