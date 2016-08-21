var mongoose = require('mongoose');

var CentroMedicoSchema = new mongoose.Schema({
	nombre: String,
	direccion: String,
	horarios: String,
	descripcion: String,
	imagenes: String,
	mapa: String,
});

module.exports = mongoose.model('CentroMedico', CentroMedicoSchema);