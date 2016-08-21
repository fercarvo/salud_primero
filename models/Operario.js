var mongoose = require('mongoose');

var OperarioSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	cedula: String,
	correo: String,
	clave: String
});

module.exports = mongoose.model('Operario', OperarioSchema);