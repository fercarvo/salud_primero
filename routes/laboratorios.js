var express = require('express');
var router = express.Router();
var Laboratorio = require('../models/Laboratorio.js');
var mongoose = require('mongoose');
var login = require('../routes/login.js');
module.exports = router;

//Get
router.get('/laboratorios', function(req, res, next){
	Laboratorio.find(function(err, laboratorio){
		if(err){
			return next(err);
		}
		res.json(laboratorio);
	});
});

//Retorna los laboratorios con sus respectivas muestras filtradas x fecha {desde: AAAA-MM-DD, hasta:AAAA-MM-DD}
router.get('/Laboratorios/muestras/:desde/:hasta', login.checkOperario, function(req, res, next){
	Laboratorio.find({})
	.populate('muestras',null, {fecha: {$gte: req.params.desde, $lt: req.params.hasta}})
	.exec(function(err, docs){
		if(err){
			return next(err);
		}
		res.json(docs);
	});
});


router.get('/Laboratorios/muestras/2/:desde/:hasta', login.checkOperario, function(req, res, next){
	var desde = new Date(req.params.desde);
	var hasta = new Date(req.params.hasta);

	var resultados = [];

	//console.log(desde);
	//console.log(desde.getMonth());
	//console.log(hasta);
	//console.log(hasta.getMonth());
	for (var i = desde.getMonth() + 1 ; i <= hasta.getMonth() + 1; i++) {
		console.log(i);
		Laboratorio.find({})
		.populate('muestras',null, {fecha: {$gte: "2016-"+i+"-01", $lt: "2016-"+i+"-31"}})
		.exec(function(err, docs){
			if(err){
				return res.send(err);
			}

			resultados.push(docs);
			//console.log(resultados);
			console.log(hasta.getMonth()-desde.getMonth()+1);
			if (resultados.length == (hasta.getMonth()-desde.getMonth()+1) ) {
				return res.json(resultados);
			}
		});		
	}
	//console.log(resultados);
});

//Post
router.post('/laboratorio', login.checkAdmin, function(req, res, next){
	var lab = new Laboratorio({
		nombre: req.body.nombre,
		direccion: req.body.direccion
	});

	lab.save(function(err, laboratorio){
		if (err) {
			return next(err);
		} else {
			res.json(laboratorio);
		}
	});
});


//Put
router.put('/laboratorio/:id', login.checkAdmin, function(req, res){
	Laboratorio.findById(req.params.id, function(err, laboratorio){
		laboratorio.nombre = req.body.nombre;
		laboratorio.direccion = req.body.direccion;

		laboratorio.save(function(err){
			if(err){
				res.send(err);
			}
			res.json(laboratorio);
		});
	});
});

//Delete
router.delete('/laboratorio/:id', login.checkAdmin, function(req, res, next){
	Laboratorio.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensaje: 'el Laboratorio se elimino'});
	});
});

router.delete('/laboratorios', login.checkAdmin, function(req, res, next){
	Laboratorio.remove({}, function(err){
		if(err){
			res.send(err);
		}
		res.json({mensagee: 'los laboratorios se eliminaron'});
	});
});