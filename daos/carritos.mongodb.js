const mongoose = require("mongoose");
const ContenedorMongoDb = require("../contenedores/ContenedorMongoDB")
const carritosModel = require('../models/carritos_models')

class CarritoDaoMongoDB extends ContenedorMongoDb {
    constructor() {
        super(carritosModel);
    }

    async getCarritoByUser(user){
        try{
            const data = await this.collection.findOne({user:user})
            return data
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = CarritoDaoMongoDB;

