var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CentroMedicoSchema = new mongoose.Schema({
	nombre: String,
	ciudad: String,
	direccion: String,
	coordenadas: {
		latitud: String,
		longitud: String
	},
	horarios: [{ type: Schema.ObjectId, ref: 'Horario' }],
	descripcion: String,
	portada: String,
	fotos: [{ type: Schema.ObjectId, ref: 'Imagen' }],
});

module.exports = mongoose.model('CentroMedico', CentroMedicoSchema);