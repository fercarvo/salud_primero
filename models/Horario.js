var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HorarioSchema = new mongoose.Schema({
	centro_id: { type: Schema.ObjectId, ref: 'CentroMedico' },
	horario: String
});

module.exports = mongoose.model('Horario', HorarioSchema);