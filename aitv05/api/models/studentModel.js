
var mongoose = require('mongoose');

//criando o schema, o qual servirá para criar o modelo (collections)
var StudentSchema = mongoose.Schema(
    {
        name: { type: String, required: true, max: 100 },
        university: { type: String, required: true, max: 100},
        course: { type: String, required: true, max: 100 }
    }
);

var StudentModel = mongoose.model('students', StudentSchema)

module.exports = StudentModel
