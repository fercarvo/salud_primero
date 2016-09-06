var mongoose = require('mongoose');

var MuestraSchema = new mongoose.Schema({
	tipo: String,
	cod_barras: String,
	recibido: {type:Boolean, default:false},
	laboratorio: String,
	centro: String,
	fecha: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Muestra', MuestraSchema);