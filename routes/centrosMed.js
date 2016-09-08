var express = require('express');
var router = express.Router();
var CentroMedico = require('../models/CentroMedico.js');
var Horario = require('../models/Horario.js');
var Imagen = require('../models/Imagen.js');
var mongoose = require('mongoose');
module.exports = router;

//Get
router.get('/centrosMed', function(req, res, next){
	CentroMedico.find(function(err, centrosMed){
		if(err){
			return next(err);
		}
		res.json(centrosMed);
	});
});


//obtiene la informacion de un centro medico especifico
router.get('/centroMed/:id', function(req, res, next){
	CentroMedico.findById(req.params.id, function(err, centroMed){
		centroMed.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(centroMed);
		});
	});
});

//Post
router.post('/centroMed', function(req, res, next){
	var centro = new CentroMedico({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		ciudad: req.body.ciudad,
		descripcion: req.body.descripcion,
		coordenadas: {
			latitud: req.body.latitud,
			longitud: req.body.longitud
		},

		horario: {
			lunes: req.body.lunes,
			martes: req.body.martes,
			miercoles: req.body.miercoles,
			jueves: req.body.jueves,
			viernes: req.body.viernes,
			sabado: req.body.sabado,
			domingo: req.body.domingo
		},

		portada: req.body.portada,
		foto1: req.body.foto1,
		foto2: req.body.foto2,
		foto3: req.body.foto3,
	});

	centro.save(function(err, centro){
		if (err) {
			return next(err);
		} else {
			res.json(centro);
		}
	});
});


//Put
router.put('/centroMed/:id', function(req, res){
	CentroMedico.findById(req.params.id, function(err, centroMed){
		centroMed.nombre = req.body.nombre;
		centroMed.direccion = req.body.direccion;
		centroMed.ciudad = req.body.ciudad;
		centroMed.descripcion = req.body.descripcion;
		centroMed.coordenadas.latitud = req.body.latitud;
		centroMed.coordenadas.longitud = req.body.longitud;
		centroMed.horario.lunes= req.body.lunes,
		centroMed.horario.martes= req.body.martes,
		centroMed.horario.miercoles= req.body.miercoles,
		centroMed.horario.jueves= req.body.jueves,
		centroMed.horario.viernes= req.body.viernes,
		centroMed.horario.sabado= req.body.sabado,
		centroMed.horario.domingo= req.body.domingo,
		centroMed.portada = req.body.portada;
		centroMed.foto1 = req.body.foto1;
		centroMed.foto2 = req.body.foto2;
		centroMed.foto3 = req.body.foto3;

		centroMed.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(centroMed);
		});
	});
});

//Delete
router.delete('/centroMed/:id', function(req, res, next){
	CentroMedico.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensaje: 'el Centro Medico se elimino'});
	});
});


/*
router.get('/centroMed/:id/horarios', function(req, res, next){
	Horario.find({centro_id: req.params.id}, function(err, centros){
		if (err) { return next(err); }
		res.json(centros);
	});
});

router.post('/centroMed/:id/horario', function(req, res, next){
	var horario = new Horario({
		centro_id: req.params.id,
		horario: req.body.horario
	});

	horario.save(function(err, horario){
		if (err) {
			return next(err);
		} else {
			res.json(horario);
		}
	});
});

router.delete('/horario/:id', function(req, res, next){
	Horario.findOneAndRemove({_id: req.params.id}, function(err, horario){
		if (err) { 
			return next(err); 
		} else {
			if (!horario) {
				res.json({mensaje: 'el horario no existe'});
			} else {
				res.json({mensaje: 'el horario se elimino'});
			}
		}
	});
});

router.get('/centroMed/:id/imagenes', function(req, res, next){
	Imagen.find({objeto_id: req.params.id}, function(err, imagenes){
		if (err) { return next(err); }
		res.json(imagenes);
	});
});

router.post('/centroMed/:id/imagen', function(req, res, next){
	var imagen = new Imagen({
		objeto_id: req.params.id,
		ruta: req.body.ruta
	});

	imagen.save(function(err, imagen){
		if (err) {
			return next(err);
		} else {
			res.json(imagen);
		}
	});
});

router.delete('/imagen/:id', function(req, res, next){
	Imagen.findOneAndRemove({_id: req.params.id}, function(err, imagen){
		if (err) { 
			return next(err); 
		} else {
			if (!imagen) {
				res.json({mensaje: 'el imagen no existe'});
			} else {
				res.json({mensaje: 'el imagen se elimino'});
			}
		}
	});
});

router.get('/imagenes', function(req, res, next){
	Imagen.find(function(err, imagenes){
		if(err){
			return next(err);
		}
		res.json(imagenes);
	});
});

router.get('/horarios', function(req, res, next){
	Horario.find(function(err, horarios){
		if(err){
			return next(err);
		}
		res.json(horarios);
	});
});
*/