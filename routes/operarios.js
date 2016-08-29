var express = require('express');
var router = express.Router();
var Operario = require('../models/Operario.js');
var Admin = require('../models/Admin.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
module.exports = router;



router.get('/operario', function(req, res, next) {
	Operario.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			res.render('operario', { 
			  	nombre: req.session.user.nombre,
			  	apellido: req.session.user.apellido  
		  	});
		}	
	});
});



router.get('/operarios', function(req, res, next){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			Operario.find(function(err, operarios){
				if(err){ 
					return next(err);
				} else {
					res.json(operarios);
				}
			});
		}	
	});
});

router.post('/operario', function(req, res, next){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
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
		}	
	});
});

router.put('/operario/:id', function(req, res){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
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
		}	
	});
});

router.delete('/operario/:id', function(req, res){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			Operario.findByIdAndRemove(req.params.id, function(err){
				if(err){
					res.send(err);
				} else {
					res.json({message: 'El operario se ha eliminado'});	
				}				
			})
		}	
	});	
});