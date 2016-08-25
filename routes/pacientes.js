var express = require('express');
var router = express.Router();
var Paciente = require('../models/Paciente.js');
var mongoose = require('mongoose');
module.exports = router;


router.get('/pacientes', function(req, res, next){
	Paciente.find(function(err, pacientes){
		if(err){
			return next(err);
		}
		res.json(pacientes);
	});
});

router.post('/paciente', function(req, res, next){	
	if (req.query.flag=="nuevo") {
		var paciente = new Paciente(req.body);
		paciente.save(function(err, paciente){
			if (err) {
				return next(err);
			}
			res.json(paciente);
		});
	} else if (req.query.flag=="login") {
		Paciente.find({correo:req.body.correo, clave:req.body.clave }, function(err, paciente){
			if(err){
				res.send(err);
			}
			res.json(paciente);
		});	
	} else {
		res.send({error: "ingrese bien la URL"});
	}
});


router.put('/paciente/:id', function(req, res){
	Paciente.findById(req.params.id, function(err, paciente){
		paciente.nombre = req.body.nombre;
		paciente.apellido = req.body.apellido;
		paciente.cedula = req.body.cedula;
		paciente.correo = req.body.correo;
		paciente.direccion = req.body.direccion;
		paciente.telefono = req.body.telefono;
		paciente.foto = req.body.foto;
		paciente.clave = req.body.clave;

		paciente.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(paciente);
		});
	});
});

router.delete('/paciente/:id', function(req, res){
	Paciente.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El paciente se ha eliminado'});
	})
});