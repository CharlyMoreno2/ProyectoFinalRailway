const mongoose = require("mongoose");
const ContenedorMongoDb = require("../contenedores/ContenedorMongoDB")
const productosModels = require('../models/productos_models')

class ProductosDaoMongoDB extends ContenedorMongoDb {
    constructor() {
        super(productosModels);
    }
}

module.exports = ProductosDaoMongoDB;

