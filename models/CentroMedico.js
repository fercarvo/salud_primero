var mongoose = require('mongoose');

var CentroMedicoSchema = new mongoose.Schema({
	nombre: String,
	ciudad: String,
	direccion: String,
	coordenadas: {
		latitud: String,
		longitud: String
	},
	horario: {
		lunes: String,
        martes: String,
        miercoles: String,
        jueves: String,
        viernes: String,
        sabado: String,
        domingo: String
	},
	descripcion: String,
	portada: String,
	foto1: String,
	foto2: String,
	foto3: String
});

module.exports = mongoose.model('CentroMedico', CentroMedicoSchema);