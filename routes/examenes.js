var express = require('express');
var router = express.Router();
var Examen = require('../models/Examen.js');
var Muestra = require('../models/Muestra.js');
var mongoose = require('mongoose');
var login = require('../routes/login.js');
module.exports = router;


//Muestra todos los examenes del sistema
router.get('/examenes', login.checkAdmin, function(req, res, next){
	Examen.find()
	.populate('_muestra')
	.exec(function(err, document){
		if(err){
			return next(err);
		}
		res.json(document);
	});
});

//muestra todos los examenes de una muestra seleccionada
router.get('/muestra/:id/examenes', login.checkLaboratorista, function(req, res, next){
	Examen.find({ _muestra: req.params.id})
	.populate('_paciente')
	.populate('_muestra')
	.populate('resultados')
	.exec(function(err, documents){
		if(err){
			return next(err);
		}
		res.json(documents);
	});
});


//Muestra todos los examenes de un paciente especifico
router.get('/pacientes/:id/examenes', login.checkPaciente, function(req, res, next){
	Examen.find({paciente:req.params.id}, function(err, examenes){
		if (err) {
			return next(err);
		}
		res.json(examenes);
	});
});

//crea una muestra para agregar un examen
router.post('/examen', login.checkOperario,function(req, res, next){
	var examen = new Examen({
		_muestra: req.body.muestra,
		nombre: req.body.nombre
	});

	//se actualiza la lista de ecamenes en muestra
	Muestra.findOne({_id: req.body.muestra}, function(err, muestra){
		if (!muestra) {
			res.json({mensaje: "la muestra no existe"});
		} else {
			muestra.examenes.push(examen);
			muestra.save();
			examen.save(function(err, doc){
				if (err) {
					return next(err);
				} else {
					res.json(doc);
				}
			});	
		}
	});
});

router.put('/examen/:id', login.checkOperario,function(req, res){
	Examen.findById(req.params.id, function(err, examen){
		//examen.paciente = req.body.paciente;
		examen.muestra = req.body.muestra;
		examen.nombre = req.body.nombre;

		examen.save(function(err){
			if (err) {
				res.send(err);
			}
			res.json(examen);
		});
	});
});

router.delete('/examen/:id', login.checkOperario,function(req, res){
	Examen.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'El examen se ha eliminado'});
	});
});