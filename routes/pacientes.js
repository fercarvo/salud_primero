var express = require('express');
var router = express.Router();
var Paciente = require('../models/Paciente.js');
var Admin = require('../models/Admin.js');
var Operario = require('../models/Operario.js');
var mongoose = require('mongoose');
module.exports = router;

/*
	API REST metodo, obtiene todos los pacientes
*/
router.get('/pacientes', function(req, res, next){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			Paciente.find(function(err, pacientes){
				if(err){
					return next(err);
				} else {
					res.json(pacientes);	
				}
			});
		}	
	});		
});

/*
	API REST metodo, crea un paciente
*/
router.post('/paciente', function(req, res, next){
	Operario.findOne({ _id: req.session.user._id }, function (err, user) { //Solo OPERARIOS logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
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
		}	
	});	
});

/*
	API REST metodo, actualiza un paciente
*/
router.put('/paciente/:id', function(req, res){
	Operario.findOne({ _id: req.session.user._id }, function (err, user) { //Solo USUARIOS logoneados pueden usar este metodo para si mismos
		if (!user || req.params.id!=req.session.user._id) { //se valida que sea paciente y sea el mismo que pretende editar
			return res.send({error: "usuario no autorizado"});
		} else {
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
		}	
	});	
});

/*
	API REST metodo, elimina un paciente
*/
router.delete('/paciente/:id', function(req, res){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			Paciente.findByIdAndRemove(req.params.id, function(err){
				if(err){
					res.send(err);
				} else {
					res.json({message: 'El paciente se ha eliminado'});	
				}
			});
		}	
	});	
});