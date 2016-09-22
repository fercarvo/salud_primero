var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var Paciente = require('../models/Paciente.js');
var Laboratorista = require('../models/Laboratorista.js');
var Operario = require('../models/Operario.js');
var Admin = require('../models/Admin.js');

module.exports = router;


router.checkAdmin = function (req, res, next) {
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			console.log("usuario NO autorizado para usar este metodo");
			next();
			//return res.send({error: "SOLO ADMINS, usted no esta autorizado"});

		} else {
			console.log("usuario autorizado");
			next();
		}	
	});
}

router.checkLaboratorista = function(req, res, next) {
	Laboratorista.findOne({ _id: req.session.user._id }, function (err, user) { //
		if (!user) {
			console.log("usuario NO autorizado para usar este metodo");
			next();
			//return res.send({error: "SOLO LABORATORISTAS, usted no esta autorizado"});

		} else {
			console.log("usuario autorizado");
			next();
		}		
	});
}

router.checkPaciente = function(req, res, next) {
	Paciente.findOne({ _id: req.session.user._id }, function (err, user) { //Solo USUARIOS logoneados pueden usar este metodo para si mismos
		if (!user 
		//|| req.params.id!=req.session.user._id
		) { //se valida que sea paciente y sea el mismo que pretende editar
			console.log("usuario NO autorizado para usar este metodo");
			//return res.send({error: "SOLO PACIENTES, usted no esta autorizado"});
			next();
		} else {
			console.log("usuario autorizado");
			next();
		}
	});
}

router.checkOperario = function(req, res, next) {
	Operario.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			console.log("usuario NO autorizado para usar este metodo");
			next();
			//return res.send({error: "SOLO OPERARIOS, usted no esta autorizado"});

		} else {
			console.log("usuario autorizado");
			next();
		}			
	});
}


router.post('/login', function(req, res, next){
	if (req.body.selectRol == "Operario") {
		Operario.findOne({correo:req.body.correo}, function(err, user){
			if(err){ //si pasa un error entra aqui
				return res.send(err);
			} else {
				if (!user) {
					return res.json({message: "usuario/clave incorrecta"});	
				} else {
					if (bcrypt.compareSync(req.body.clave, user.clave )) { //valida si la clave es correcta
						user_for_session = { //Para no guardar claves en cookie se crea este usuario temporal
							_id: user._id,
							nombre: user.nombre,
							apellido: user.apellido,
							tipo: "Operario"
						};
						req.session.user = user_for_session;
						res.redirect('/operario');
					} else {
						return res.json({message: "usuario/clave incorrecta"});
					}
				}
			}
		});

	} else if (req.body.selectRol == "Paciente") {
		Paciente.findOne({correo:req.body.correo}, function(err, user){
			if(err){ //si pasa un error entra aqui
				return res.send(err);
			} else {
				if (!user) {
					return res.json({message: "usuario/clave incorrecta"});	
				} else {
					if (bcrypt.compareSync(req.body.clave, user.clave )) { //valida si la clave es correcta
						user_for_session = { //Para no guardar claves en cookie se crea este usuario temporal
							_id: user._id,
							nombre: user.nombre,
							apellido: user.apellido,
							tipo: "Paciente"

						};
						req.session.user = user_for_session;
						res.redirect('/paciente');	
					} else {
						return res.json({message: "usuario/clave incorrecta"});
					}
				}
			}
		});

	} else if (req.body.selectRol == "Laboratorista") {
		Laboratorista.findOne({correo:req.body.correo}, function(err, user){
			if(err){ //si pasa un error entra aqui
				return res.send(err);
			} else {
				if (!user) {
					return res.json({message: "usuario/clave incorrecta"});	
				} else {
					if (bcrypt.compareSync(req.body.clave, user.clave )) { //valida si la clave es correcta
						user_for_session = { //Para no guardar claves en cookie se crea este usuario temporal
							_id: user._id,
							nombre: user.nombre,
							apellido: user.apellido,
							tipo: "Laboratorista"

						};
						req.session.user = user_for_session;
						res.redirect('/laboratorista');	
					} else {
						return res.json({message: "usuario/clave incorrecta"});
					}
				}				
			}
		});
	} else if (req.body.selectRol == "Admin") {
		Admin.findOne({correo:req.body.correo}, function(err, user){
			if(err){ //si pasa un error entra aqui
				return res.send(err);
			} else {
				if (!user) {
					return res.json({message: "usuario/clave incorrecta"});	
				} else {
					if (bcrypt.compareSync(req.body.clave, user.clave )) { //valida si la clave es correcta
						user_for_session = { //Para no guardar claves en cookie se crea este usuario temporal
							_id: user._id,
							nombre: user.nombre,
							apellido: user.apellido,
							tipo: "Admin"

						};
						req.session.user = user_for_session;
						return res.json(req.session.user);	
					} else {
						return res.json({message: "usuario/clave incorrecta"});
					}
				}
			}
		});
	} else {
		return res.json({message: "ingrese bien la URL"});
	}
});


router.get('/islogin', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    res.json(req.session.user);

  } else {
    return res.json({message: "usted no esta logoneado"});
  }
});


router.get('/check/admin', function(req, res, next) {
	Admin.findOne({ _id: req.session.user._id }, function (err, user) { //Solo Admins logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "usuario no autorizado"});
			//console.log("usuario no autorizado");
		} else {
			console.log("usuario autorizado");
			next();
		}	
	});
});




router.get('/logout', function(req, res) {
  req.session.reset();
  res.render('index.ejs');
});

