const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    nombre:String,
    username:String,
    password:String,
    email:String,
    numeroTel:String,
    direccion:String,
    pais:String,
    fotoPerfil:String,
    admin:Boolean
});

const UserModel = mongoose.model("user", Schema);
module.exports = UserModel;