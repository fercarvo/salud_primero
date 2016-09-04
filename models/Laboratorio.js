var mongoose = require('mongoose');

var LaboratorioSchema = new mongoose.Schema({
	nombre: String	
});

module.exports = mongoose.model('Laboratorio', LaboratorioSchema);