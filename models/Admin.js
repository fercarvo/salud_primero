var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	cedula: String,
	correo: String,
	clave: String
});

module.exports = mongoose.model('Admin', AdminSchema);