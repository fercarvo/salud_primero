var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HorarioSchema = new mongoose.Schema({
	centro_id: { 
		type: Schema.ObjectId, 
		ref: 'Centro',
		required: true },
	horario: String
});

module.exports = mongoose.model('Horario', HorarioSchema);