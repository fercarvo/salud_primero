var mongoose = require('mongoose');

var ExamenSchema = new mongoose.Schema({
	paciente: String,
	muestra: String,
	laboratorio: String,
	centroMedico: String,
	parametro: String,
	unidades: String,
	resultado: String,
	valores_referencia: String,
});

module.exports = mongoose.model('Examen', ExamenSchema);