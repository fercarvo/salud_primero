var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExamenSchema = new mongoose.Schema({
	_muestra: { 
		type: Schema.ObjectId, 
		ref: 'Muestra',
		required: true },
	resultados: [{ type: Schema.ObjectId, ref: 'Resultado' }],
	nombre: {type: String, required: true}
});

module.exports = mongoose.model('Examen', ExamenSchema);