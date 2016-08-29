var mongoose = require('mongoose');

var ImagenSchema = new mongoose.Schema({
	objeto_id: String,
	ruta: String
});

module.exports = mongoose.model('Imagen', ImagenSchema);