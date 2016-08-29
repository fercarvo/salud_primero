var mongoose = require('mongoose');

var CentroMedicoSchema = new mongoose.Schema({
	nombre: String,
	ciudad: String,
	direccion: String,
	coordenadas: {
		latitud: String,
		longitud: String
	},
	descripcion: String,
});

module.exports = mongoose.model('CentroMedico', CentroMedicoSchema);