const { Router } = require('express')
const productosRouter = Router()

const ProductosDaoMongoDb = require('../daos/productos.mongodb')
const productosDao = new ProductosDaoMongoDb();
const { getCurrentUser } = require('../middlewares/currentUser')
const { authMiddleware } = require('../middlewares/auth.middleware')

const {getListDtoProductos} = require('../dto/producto.dto')

productosRouter.get('/',authMiddleware,async (req,res)=>{
    try{
        const productos = await productosDao.getAll();
        const productosData = getListDtoProductos(productos);
        const user = await getCurrentUser(req.user);
        res.render('productos',{productos: productosData, user: user})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = { 
    productosRouter 
}