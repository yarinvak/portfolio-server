let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let patientSchema = new Schema({
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

let caseSchema = new Schema({
    patientInfo: patientSchema,
    creationDate: Date,
    lastUpdateDate: Date,
    managerId: String
});

module.exports = mongoose.model('Case', caseSchema);