var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PacienteSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	cedula: String,
	correo: {type: String, required: true},
	direccion: String,
	telefono: String,
	foto: String,
	clave: String,
	muestras: [{ type: Schema.ObjectId, ref: 'Muestra'}]
});

module.exports = mongoose.model('Paciente', PacienteSchema);