const { Router } = require('express')
const productosRouter = Router()

const ProductosDaoMongoDb = require('../daos/productos.mongodb')
const productosDao = new ProductosDaoMongoDb();

productosRouter.get('/',async (req,res)=>{
    try{
        const productos = await productosDao.getAll();
        res.status(200).json(productos);
    }
    catch(err){
        console.log(err)
    }
})

productosRouter.post('/',async (req,res)=>{
    try{
        const productoObject = req.body;
        const productoId = await productosDao.save(productoObject);
        res.status(200).json(productoId);
    }
    catch(err){
        console.log(err)
    }
})

module.exports = productosRouter;