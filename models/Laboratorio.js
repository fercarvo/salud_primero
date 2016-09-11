var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LaboratorioSchema = new mongoose.Schema({
	nombre: String,
	direccion: String,
	muestras: [{ type: Schema.ObjectId, ref: 'Muestra' }]	
});

module.exports = mongoose.model('Laboratorio', LaboratorioSchema);