var mongoose = require('mongoose');

var MuestraExSchema = new mongoose.Schema({
    paciente: String,
    tipoMuestra: String,
    examen: String,
	cod_barras: String,
	recibido: {type:Boolean, default:false},
	laboratorio: String,
	centro: String,
	fecha: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Muestra', MuestraExSchema);