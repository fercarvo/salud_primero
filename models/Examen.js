var mongoose = require('mongoose');

var ExamenSchema = new mongoose.Schema({
	paciente: {type: String, required: true},
	muestra: {type: String, required: true},
	nombre: {type: String, required: true},
});

module.exports = mongoose.model('Examen', ExamenSchema);