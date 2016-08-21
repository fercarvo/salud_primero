var mongoose = require('mongoose');

var LaboratoristaSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	cedula: String,
	correo: String,
	clave: String
});

module.exports = mongoose.model('Laboratorista', LaboratoristaSchema);