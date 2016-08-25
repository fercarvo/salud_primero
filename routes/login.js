var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Paciente = require('../models/Paciente.js');
var Laboratorista = require('../models/Laboratorista.js');
var Operario = require('../models/Operario.js');
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
		//clave: bcrypt.compareSync(req.body.clave, user.clave )
		Operario.findOne({correo:req.body.correo}, function(err, user){

			if(err){ //si pasa un error entra aqui
				res.send(err);
			} else {
				if (bcrypt.compareSync(req.body.clave, user.clave )) { //valida si la clave es correcta
					req.session.user = user;
					res.json(user);	
				} else {
					res.json({error: "usuario o clave incorrecta"});
				}
			}
			
			
		});

	} else if (req.body.selectRol == "Paciente") {
		Paciente.findOne({correo:req.body.correo, clave:req.body.clave }, function(err, user){
			if(err){
				res.send(err);
			}
			req.session.user = user;
			res.json(user);
		});	

	} else if (req.body.selectRol == "Laboratorista") {
		console.log("aqui");
		Laboratorista.findOne({correo:req.body.correo, clave:req.body.clave }, function(err, user){
			if(err){
				res.send(err);
			}
			req.session.user = user;
			res.json(user);
		});
	}
});


router.get('/islogin', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    res.send("si existe");
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        //res.redirect('/login');
        req.send({error: "usted no esta logoneado"});
      } else {
        // expose the user to the template
        res.locals.user = user;
 
        // render the dashboard page
        res.json({no_error: "usted esta logoneado",user: req.session.user.email});

        //res.render('dashboard.jade');
      }
    });
  } else {
    res.json({error: "usted no esta logoneado"});
  }
});


router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

