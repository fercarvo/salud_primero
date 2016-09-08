var express = require('express');
var router = express.Router();
var Paciente = require('../models/Paciente.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var login = require('../routes/login.js');
var nodemailer = require('nodemailer');

module.exports = router;

router.get('/paciente', login.checkPaciente, function(req, res, next) {
  res.render('paciente', { 
  	nombre: req.session.user.nombre,
  	apellido: req.session.user.apellido  
  });
});


router.get('/paciente/datos', login.checkPaciente, function(req, res){
	Paciente.findOne({ _id: req.session.user._id }, function (err, user) { //Solo pacientes logoneados pueden usar este metodo
		if (!user) {
			return res.send({error: "USTED NO ES PACIENTE"});
		} else {
			res.json(user);
		}	
	});
});

router.put('/paciente/datos', login.checkPaciente, function(req, res){

	Paciente.findOne({ _id: req.session.user._id }, function(err, paciente){
		paciente.nombre = req.body.nombre;
		paciente.apellido = req.body.apellido;
		paciente.cedula = req.body.cedula;
		paciente.direccion = req.body.direccion;
		paciente.telefono = req.body.telefono;

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
	API REST metodo, obtiene todos los pacientes
*/
router.get('/pacientes', login.checkAdmin, function(req, res, next){ 
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


/*
//restablecer contraseña
router.put('/paciente/reset-password/:id', function(req,res,next){

	Paciente.findById(req.params.id, function(err, paciente){
	var clave_nueva = Math.random().toString(36).slice(-8);//genera cadena aleatoria
	var hash = bcrypt.hashSync(clave_temp, bcrypt.genSaltSync(10));

	var transporter = nodemailer.createTransport('smtps://saludprimero.2016%40gmail.com:salud2016@smtp.gmail.com');

    var mensaje  = "Se ha reestablecido su contraseña. Su contraseña nueva es:"+ clave_nueva;
  	
	var mailOptions = {
    	from: "Admin <saludprimero.2016@gmail.com>",
    	to: paciente.correo,
    	subject: "Reestablecimiento de Contraseña",
    	text: mensaje
    };

    paciente.clave = hash;

	paciente.save(function(err){
		if (err) {
			res.send(err);
		} else {
			res.json(paciente);
		}
	});
});
*/

router.post('/super-paciente', login.checkAdmin, function(req, res, next){ //Solo OPERARIOS logoneados pueden usar este metodo
	  	
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


router.post('/paciente', login.checkOperario, function(req, res, next){ //Solo OPERARIOS logoneados pueden usar este metodo
	
  	var clave_temp = Math.random().toString(36).slice(-8);//genera cadena aleatoria
  	console.log(clave_temp);
  	
  	var hash = bcrypt.hashSync(clave_temp, bcrypt.genSaltSync(10));

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

	var transporter = nodemailer.createTransport('smtps://saludprimero.2016%40gmail.com:salud2016@smtp.gmail.com');

    var mensaje  = "Ud ha sido agregado como paciente, su usuario es su correo y su clave temporal es: " + clave_temp;
  	
	var mailOptions = {
    	from: "Admin <saludprimero.2016@gmail.com>",
    	to: paciente.correo,
    	subject: "Bienvenida",
    	text: mensaje
    };

	paciente.save(function(err, usr){
		if (err) {
			return next(err);
		} else {
			transporter.sendMail(mailOptions, function(error, respuesta){
				if (error){
					res.send(error);
				}else{
					res.send('correo enviado');
				}
			});
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