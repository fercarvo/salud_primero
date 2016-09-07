var mongoose = require('mongoose');

var ExamenSchema = new mongoose.Schema({
	paciente: String,
	muestra: String,
	nombre: String,
});

module.exports = mongoose.model('Examen', ExamenSchema);