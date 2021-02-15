const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema ({
    id: Number,
    nome : String,
    email : String,
    foto : String
})
module.exports = mongoose.model("Usuario", usuarioSchema);