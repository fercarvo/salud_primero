var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Paciente = require('../models/Paciente.js');
var Laboratorista = require('../models/Laboratorista.js');
var Operario = require('../models/Operario.js');
module.exports = router;



router.post('/login', function(req, res, next){

	if (req.body.selectRol == "Operario") {
		Operario.findOne({correo:req.body.correo, clave:req.body.clave }, function(err, user){

			if(err){
				res.send(err);
			}
			//req.session.user = user;
			res.json(user);
		});

	} else if (req.body.selectRol == "Paciente") {
		Paciente.findOne({correo:req.body.correo, clave:req.body.clave }, function(err, user){
			if(err){
				res.send(err);
			}
			//req.session.user = user;
			res.json(user);
		});	

	} else if (req.body.selectRol == "Laboratorista") {
		console.log("aqui");
		Laboratorista.findOne({correo:req.body.correo, clave:req.body.clave }, function(err, user){
			if(err){
				res.send(err);
			}
			//req.session.user = user;
			res.json(user);
		});
	}
});