const mongoose = require("mongoose");
const ContenedorMongoDb = require("../contenedores/ContenedorMongoDB")
const usersModels = require('../models/users.models')

class UsersDaoMongoDB extends ContenedorMongoDb {
    constructor() {
        super(usersModels);
    }

    async getByUsername(username){
        try{
            const data = await this.collection.findOne({username:username})
            return data
        }
        catch(err){
            console.log(err)
        }
    }

}

module.exports = UsersDaoMongoDB;

