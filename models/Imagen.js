var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagenSchema = new mongoose.Schema({
	_centro: { 
		type: Schema.ObjectId, 
		ref: 'Centro',
		required: true },
	ruta: String
});

module.exports = mongoose.model('Imagen', ImagenSchema);