var express = require('express');
var router = express.Router();
var Laboratorista = require('../models/Operario.js');
var mongoose = require('mongoose');
module.exports = router;


router.get('/laboratoristas', function(req, res, next){
	Laboratorista.find(function(err, laboratoristas){
		if(err){
			return next(err);
		}
		res.json(laboratoristas);
	});
});

router.post('/laboratorista', function(req, res, next){
	var laboratorista = new Laboratorista(req.body);

	laboratorista.save(function(err, laboratorista){
		if (err) {
			return next(err);
		}
		res.json(laboratorista);
	});
});

router.put('/laboratorista/:id', function(req, res){
	Laboratorista.findById(req.params.id, function(err, laboratorista){
		laboratorista.nombre = req.body.nombre;
		laboratorista.apellido = req.body.apellido;
		laboratorista.cedula = req.body.cedula;
		laboratorista.correo = req.body.correo;
		laboratorista.clave = req.body.clave;

		laboratorista.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(laboratorista);
		});
	});
});

router.delete('/laboratorista/:id', function(req, res){
	Laboratorista.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El laboratorista se ha eliminado'});
	})
});