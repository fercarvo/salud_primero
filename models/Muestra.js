var mongoose = require('mongoose');

var MuestraSchema = new mongoose.Schema({
	tipo: String,
	cod_barras: String,
	recibido: Boolean
});

module.exports = mongoose.model('Muestra', MuestraSchema);