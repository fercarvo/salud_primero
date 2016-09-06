var express = require('express');
var router = express.Router();
var Laboratorista = require('../models/Laboratorista.js');
var login = require('../routes/login.js');
var mongoose = require('mongoose');
module.exports = router;


router.get('/laboratorista', login.checkLaboratorista, function(req, res, next) {
  res.render('laboratorista', { 
  	nombre: req.session.user.nombre,
  	apellido: req.session.user.apellido,
  	tipo: req.session.user.tipo
  });
});

router.get('/laboratoristas', login.checkAdmin, function(req, res, next){
	Laboratorista.find(function(err, laboratoristas){
		if(err){
			return next(err);
		}
		res.json(laboratoristas);
	});
});

router.post('/laboratorista', login.checkAdmin, function(req, res, next){
	var hash = bcrypt.hashSync(req.body.clave, bcrypt.genSaltSync(10));

	var laboratorista = new Laboratorista({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		cedula: req.body.cedula,
		correo: req.body.correo,
		clave: hash
	});

	laboratorista.save(function(err, usr){
		if (err) {
			return next(err);
		}
		res.json(usr);
	});
});

router.put('/laboratorista/:id', login.checkAdmin,function(req, res){
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

router.delete('/laboratorista/:id', login.checkAdmin, function(req, res){
	Laboratorista.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El laboratorista se ha eliminado'});
	});
});