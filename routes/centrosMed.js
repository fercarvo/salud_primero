var express = require('express');
var router = express.Router();
var CentroMedico = require('../models/CentroMedico.js');
var mongoose = require('mongoose');
module.exports = router;

//Get
router.get('/centrosMed', function(req, res, next){
	CentroMedico.find(function(err, centrosMed){
		if(err){
			return next(err);
		}
		res.json(centrosMed);
	});
});

//Post
router.post('/centroMed', function(req, res, next){
	var centroMed = new CentroMedico(req.body);

	centroMed.save(function(err, centroMed){
		if(err){
			return next(err);
		}
		res.json(centroMed);
	});
});


//Put
router.put('/centroMed/:id', function(req, res){
	CentroMedico.findById(req.params.id, function(err, centroMed){
		centroMed.nombre = req.body.nombre;
		centroMed.direccion = req.body.direccion;
		centroMed.horarios = req.body.horarios;
		centroMed.descripcion = req.body.descripcion;
		centroMed.imagenes = req.body.imagenes;
		centroMed.mapa = req.body.mapa;

		centroMed.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(centroMed);
		});
	});
});

//Delete
router.delete('/centroMed/:id', function(req, res, next){
	CentroMedico.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensaje: 'el Centro Medico se elimino'});
	});
});