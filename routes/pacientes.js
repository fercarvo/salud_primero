var express = require('express');
var router = express.Router();
var Paciente = require('../models/Paciente.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var login = require('../routes/login.js');

module.exports = router;


router.get('/paciente', login.checkPaciente,function(req, res, next) {
  res.render('paciente', { 
  	nombre: req.session.user.nombre,
  	apellido: req.session.user.apellido  
  });
});


/*
	API REST metodo, obtiene todos los pacientes
*/
router.get('/pacientes', login.checkAdmin, function(req, res, next){ //Solo Admins logoneados pueden usar este metodo
	Paciente.find(function(err, pacientes){
		if(err){
			return next(err);
		} else {
			res.json(pacientes);	
		}
	});
});

/*
	API REST metodo, crea un paciente
*/
router.post('/paciente', login.checkOperario, function(req, res, next){ //Solo OPERARIOS logoneados pueden usar este metodo
	var hash = bcrypt.hashSync(req.body.clave, bcrypt.genSaltSync(10));

	var paciente = new Paciente({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		cedula: req.body.cedula,
		correo: req.body.correo,
		direccion: req.body.direccion,
		telefono: req.body.telefono,
		foto: req.body.foto,
		clave: hash
	});

	paciente.save(function(err, usr){
		if (err) {
			return next(err);
		} else {
			res.json(usr);
		}
	});
});

/*
	API REST metodo, actualiza un paciente
*/
router.put('/paciente/:id', login.checkPaciente, function(req, res){ //Solo USUARIOS logoneados pueden usar este metodo para si mismos
	var hash = bcrypt.hashSync(req.body.clave, bcrypt.genSaltSync(10));

	Paciente.findById(req.params.id, function(err, paciente){
		paciente.nombre = req.body.nombre;
		paciente.apellido = req.body.apellido;
		paciente.cedula = req.body.cedula;
		paciente.correo = req.body.correo;
		paciente.direccion = req.body.direccion;
		paciente.telefono = req.body.telefono;
		paciente.foto = req.body.foto;
		paciente.clave = hash;

		paciente.save(function(err){
			if (err) {
				res.send(err);
			} else {
				res.json(paciente);
			}
		});
	});
});


/*
	API REST metodo, elimina un paciente
*/
router.delete('/paciente/:id', login.checkAdmin, function(req, res){ //Solo Admins logoneados pueden usar este metodo
	Paciente.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		} else {
			res.json({message: 'El paciente se ha eliminado'});	
		}
	});
});