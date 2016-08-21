var mongoose = require('mongoose');

var MuestraSchema = new mongoose.Schema({
	tipo: String,
	nombre: String,
	cod_barras: String,
	recibido: Boolean
});

mongoose.model('Muestra', MuestraSchema);