var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Paciente = require('../models/Paciente.js');
var Laboratorista = require('../models/Laboratorista.js');
var Operario = require('../models/Operario.js');
//var session = require('client-sessions');
//var session = require('client-sessions');
module.exports = router;

/*
router.use(session({
	cookieName: 'session',
	secret: 'olakeasequeriendoverquehayaquioquehace:v',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));
*/

router.post('/login', function(req, res, next){

	if (req.body.selectRol == "Operario") {
		Operario.findOne({correo:req.body.correo}, function(err, user){
			if(err){ //si pasa un error entra aqui
				return res.send(err);
			} else {
				if (bcrypt.compareSync(req.body.clave, user.clave )) { //valida si la clave es correcta
					user_for_session = { //Para no guardar claves en cookie se crea este usuario temporal
						_id: user._id,
						nombre: user.nombre,
						apellido: user.apellido
					};
					req.session.user = user_for_session;
					return res.json(req.session.user);	
				} else {
					return res.json({message: "usuario/clave incorrecta"});
				}
			}
		});

	} else if (req.body.selectRol == "Paciente") {
		Paciente.findOne({correo:req.body.correo, clave:req.body.clave }, function(err, user){
			if(err){
				res.send(err);
			}
			req.session.user = user;
			return res.json(user);
		});	

	} else if (req.body.selectRol == "Laboratorista") {
		console.log("aqui");
		Laboratorista.findOne({correo:req.body.correo, clave:req.body.clave }, function(err, user){
			if(err){
				res.send(err);
			}
			req.session.user = user;
			return res.json(user);
		});
	} else {
		return res.json({message: "ingrese bien la URL"});
	}
});


router.get('/islogin', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    res.json(req.session.user);
    /* para validar la entrada de un operario en otra pagina
    Operario.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        req.session.reset();
        return req.send({error: "usted no esta logoneado"});
      } else {

      }
    });
    */
  } else {
    return res.json({message: "usted no esta logoneado"});
  }
});


router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

router.get('/operario', function(req, res) {
  res.json(req.session.user);
  //res.redirect('/');
});

