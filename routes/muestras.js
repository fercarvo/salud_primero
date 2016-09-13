var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Muestra = require('../models/Muestra.js');
var Centro = require('../models/CentroMedico.js');
var Laboratorio = require('../models/Laboratorio.js');
var Paciente = require('../models/Paciente.js');
var login = require('../routes/login.js');

module.exports = router; 


//obtiene todas las muestras del sistema
router.get('/muestras', login.checkLaboratorista, function(req, res, next){
	Muestra.find(function(err, muestras){
		if(err){
			return next(err);
		}
		res.json(muestras);
	});
});

//crea una nueva muestra
router.post('/muestra', login.checkOperario, function(req, res, next){

	var cod_barras = Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;//genera cadena aleatoria

	var muestra = new Muestra({
		tipo: req.body.tipo,
		cod_barras: cod_barras,
		_paciente: req.body.paciente,
		_laboratorio: req.body.laboratorio,
		_centro: req.body.centro
	});

	Laboratorio.findOne({_id: req.body.laboratorio}, function(err, lab){
		lab.muestras.push(muestra);
		lab.save();
	});

	Centro.findOne({_id: req.body.centro}, function(err, centro){
		centro.muestras.push(muestra);
		centro.save();
	});

	Paciente.findOne({_id: req.body.paciente}, function(err, paciente){
		paciente.muestras.push(muestra);
		paciente.save();
	});

	muestra.save(function(err, doc){
		if (err) {
			return res.json(err);
		} else {
			res.json(doc);
		}
	});
});

//actualiza una muestra
router.put('/muestra/:id', login.checkOperario,function(req, res){
	Muestra.findById(req.params.id, function(err, muestra){
		muestra._paciente = req.body.paciente;
		muestra._laboratorio= req.body.laboratorio;
		muestra._centro = req.body.centro;
		muestra.tipo = req.body.tipo;

		muestra.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: 'La muestra se edito'});
		});
	});
});

//Delete
router.delete('/muestra/:id', login.checkOperario, function(req, res, next){
	Muestra.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({message: 'la muestra se elimino'});
	});
});

router.delete('/muestras', login.checkOperario, function(req, res, next){
	Muestra.remove({}, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensagee: 'las muestras se eliminaron'});
	});
});

router.patch('/muestra/:id', login.checkOperario, function(req, res){
	Muestra.findById(req.params.id, function(err, muestra){
		muestra.recibido = req.body.recibido;
		muestra.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(muestra);
		});
	});
});


