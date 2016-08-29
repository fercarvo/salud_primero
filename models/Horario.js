var mongoose = require('mongoose');

var HorarioSchema = new mongoose.Schema({
	centro_id: String,
	horario: String
});

module.exports = mongoose.model('Horario', HorarioSchema);