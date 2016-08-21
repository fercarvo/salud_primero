var mongoose = require('mongoose');

var PacienteSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	cedula: String,
	correo: String,
	direccion: String,
	telefono: String,
	foto: String,
	clave: String
});

module.exports = mongoose.model('Paciente', PacienteSchema);