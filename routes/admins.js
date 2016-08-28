var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
module.exports = router;


router.get('/admins', function(req, res, next){
    Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			//req.session.reset();
			return res.send({error: "usuario no autorizado"});
		} else {
			Admin.find(function(err, admins){
				if(err){
					return next(err);
				}else {
					res.json(admins);
				}
			});
		}	
	});
});

router.post('/admin', function(req, res, next){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			var hash = bcrypt.hashSync(req.body.clave, bcrypt.genSaltSync(10));

			var admin = new Admin({
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				cedula: req.body.cedula,
				correo: req.body.correo,
				clave: hash
			});

			admin.save(function(err, admin){
				if (err) {
					return next(err);
				} else {
					res.json(admin);
				}
			});
		}	
	});
	
});

router.put('/admin/:id', function(req, res){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			Admin.findById(req.params.id, function(err, user){
				user.nombre = req.body.nombre;
				user.apellido = req.body.apellido;
				user.cedula = req.body.cedula;
				user.correo = req.body.correo;
				user.clave = req.body.clave;

				user.save(function(err){
					if (err) {
						res.send(err);
					} else {
						res.json(user);
					}
				});
			});
		}	
	});
});

router.delete('/admin/:id', function(req, res){
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
		} else {
			Admin.findByIdAndRemove(req.params.id, function(err){
				if(err){
					res.send(err);
				} else {
					res.json({message: 'El admin se ha eliminado'});
				}
			});
		}	
	});
});