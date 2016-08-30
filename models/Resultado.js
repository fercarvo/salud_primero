var mongoose = require('mongoose');

var ResultadoSchema = new mongoose.Schema({
	examen: String,
	parametro: String,
	unidades: String,
	resultado: String,
	valores_referencia: String,
});

module.exports = mongoose.model('Resultado', ResultadoSchema);