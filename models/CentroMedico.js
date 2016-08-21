var mongoose = require('mongoose');

var CentroMedicoSchema = new mongoose.Schema({
	nombre: String,
	direccion: String,
	horarios: [],
	descripcion: [],
	imagenes: String,
	mapa: String,
});

mongoose.model('CentroMedico', CentroMedicoSchema);