var express = require('express');
var router = express.Router();
var CentroMedico = require('../models/CentroMedico.js');
var Horario = require('../models/Horario.js');
var Imagen = require('../models/Imagen.js');
var mongoose = require('mongoose');
var login = require('../routes/login.js');
module.exports = router;

//Get 
router.get('/centrosMed', function(req, res, next){
	CentroMedico.find()
	.populate('horarios')
	.populate('fotos')
	.exec(function(err, centrosMed){
		if(err){
			return next(err);
		}
		res.json(centrosMed);
	});
});


/*
//obtiene la informacion de un centro medico especifico
router.get('/centroMed/:id', function(req, res, next){
	CentroMedico.find({_id: req.params.id})
	.populate('horarios')
	.populate('fotos')
	.exec(function(err, centroMed){
		centroMed.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(centroMed);
		});
	});
});
*/

//Post
router.post('/centroMed', login.checkAdmin, function(req, res, next){
	var centro = new CentroMedico({
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		ciudad: req.body.ciudad,
		descripcion: req.body.descripcion,
		coordenadas: {
			latitud: req.body.latitud,
			longitud: req.body.longitud
		},
		portada: req.body.portada,
	});

	centro.save(function(err, centro){
		if (err) {
			return next(err);
		} else {
			res.json(centro);
		}
	});
});


//Delete
router.delete('/centroMed/:id', login.checkAdmin, function(req, res, next){
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
*/


router.post('/centroMed/:id/horario', login.checkAdmin,function(req, res, next){
	var horario = new Horario({
		centro_id: req.params.id,
		horario: req.body.horario
	});

	CentroMedico.findById(req.params.id, function(err, centroMed){
		centroMed.horarios.push(horario);
		centroMed.save();
		horario.save(function(err, horario){
			if (err) {
				return next(err);
			} else {
				res.json(horario);
			}
		});

	});

});


router.delete('/horario/:id', login.checkAdmin, function(req, res, next){
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

router.delete('/centrosMed', login.checkAdmin, function(req, res, next){
	CentroMedico.remove({}, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensagee: 'Todos los centros medicos se eliminaron'});
	});
});

/*
router.get('/centroMed/:id/imagenes', function(req, res, next){
	Imagen.find({objeto_id: req.params.id}, function(err, imagenes){
		if (err) { return next(err); }
		res.json(imagenes);
	});
});
*/

router.post('/centroMed/:id/imagen', login.checkAdmin, function(req, res, next){
	var imagen = new Imagen({
		_centro: req.params.id,
		ruta: req.body.ruta
	});

	CentroMedico.findById(req.params.id, function(err, centroMed){
		centroMed.fotos.push(imagen);
		centroMed.save();
		imagen.save(function(err, doc){
			if (err) {
				return next(err);
			} else {
				res.json(doc);
			}
		});
	});

});

router.delete('/imagen/:id', login.checkAdmin, function(req, res, next){
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
	Horario.find()
	.populate('centro_id')
	.exec(function(err, horarios){
		if(err){
			return next(err);
		}
		res.json(horarios);
	});
});

//cambia la latitud del centro medico
router.put('/centroMed/:id/latitud', function(req, res){
	CentroMedico.findOne({_id: req.params.id}, function(err, doc){
		doc.coordenadas.latitud = req.body.latitud;
		doc.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(doc);
		});
	});
});
