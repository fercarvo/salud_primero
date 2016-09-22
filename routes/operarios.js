var express = require('express');
var router = express.Router();
var Operario = require('../models/Operario.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var login = require('../routes/login.js');

module.exports = router;

router.get('/operario', login.checkOperario, function(req, res, next) {
	res.render('operario', { 
	  	nombre: req.session.user.nombre,
	  	apellido: req.session.user.apellido  
  	});
});

router.get('/operarios', login.checkAdmin, function(req, res, next){
	Operario.find(function(err, operarios){
		if(err){ 
			return next(err);
		} else {
			res.json(operarios);
		}
	});
});

router.post('/operario', login.checkAdmin, function(req, res, next){
	var hash = bcrypt.hashSync(req.body.clave, bcrypt.genSaltSync(10));

	var operario = new Operario({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		cedula: req.body.cedula,
		correo: req.body.correo,
		clave: hash
	});

	operario.save(function(err, usr){
		if (err) {
			return next(err);
		} else {
			res.json(usr);	
		}				
	});
});


router.put('/operario/:id', login.checkAdmin, function(req, res){
	Operario.findById(req.params.id, function(err, operario){
		operario.nombre = req.body.nombre;
		operario.apellido = req.body.apellido;
		operario.cedula = req.body.cedula;
		operario.correo = req.body.correo;
		operario.clave = req.body.clave;

		operario.save(function(err){
			if (err) {
				res.send(err);
			} else {
				res.json(operario);	
			}					
		});
	});
});

router.delete('/operario/:id', login.checkAdmin, function(req, res){
	Operario.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		} else {
			res.json({message: 'El operario se ha eliminado'});	
		}				
	})
});