var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultadoSchema = new mongoose.Schema({
	_examen: { 
		type: Schema.ObjectId, 
		ref: 'Examen',
		required: true },
	parametro: String,
	unidades: String,
	resultado: String,
	valores_referencia: String,
});

module.exports = mongoose.model('Resultado', ResultadoSchema);