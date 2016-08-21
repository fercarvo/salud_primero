var mongoose = require('mongoose');

var ExamenSchema = new mongoose.Schema({
	paciente: String,
	muestra: String,
	laboratorio: String,
	centroMedico: String,
	estado: String
});

module.exports = mongoose.model('Examen', ExamenSchema);