var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    privateName: String,
    surName: String,
    age: Number,
    address: String,
    picture: String,
    id_number: String,
    phone: String,
    diagnosis: String,
    details: [String]
});

module.exports = mongoose.model('Patient', patientSchema);