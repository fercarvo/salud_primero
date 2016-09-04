var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Admin = require('../models/Admin.js');
var login = require('../routes/login.js');

module.exports = router;


router.get('/admins', login.checkAdmin, function(req, res, next){
	Admin.find(function(err, admins){
		if(err){
			return next(err);
		}else {
			res.json(admins);
		}
	});
});

router.post('/admin', login.checkAdmin, function(req, res, next){
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
});

router.put('/admin/:id', login.checkAdmin, function(req, res){
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
});

router.delete('/admin/:id', login.checkAdmin, function(req, res){
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