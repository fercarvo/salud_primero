var express = require('express');
var router = express.Router();
var Operario = require('../models/Operario.js');
var mongoose = require('mongoose');
module.exports = router;


router.get('/operarios', function(req, res, next){
	Operario.find(function(err, operarios){
		if(err){
			return next(err);
		}
		res.json(operarios);
	});
});

router.post('/operario', function(req, res, next){
	var operario = new Operario(req.body);

	operario.save(function(err, operario){
		if (err) {
			return next(err);
		}
		res.json(operario);
	});
});

router.put('/operario/:id', function(req, res){
	Operario.findById(req.params.id, function(err, operario){
		operario.nombre = req.body.nombre;
		operario.apellido = req.body.apellido;
		operario.cedula = req.body.cedula;
		operario.correo = req.body.correo;
		operario.clave = req.body.clave;

		operario.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(operario);
		});
	});
});

router.delete('/operario/:id', function(req, res){
	Operario.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El operario se ha eliminado'});
	})
});