var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MuestraSchema = new mongoose.Schema({
	tipo: String,
	cod_barras: String,
	recibido: {type:Boolean, default:false},
	_paciente: { 
		type: Schema.ObjectId, 
		ref: 'Paciente',
		required: true },
	_laboratorio: { 
		type: Schema.ObjectId, 
		ref: 'Laboratorio',
		required: true },
	_centro: { 
		type: Schema.ObjectId, 
		ref: 'Centro',
		required: true },
	fecha: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Muestra', MuestraSchema);