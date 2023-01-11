const { Router } = require("express");
const carritoRouter = Router();

const CarritoDaoMongoDB = require("../daos/carritos.mongodb");
const carritoDao = new CarritoDaoMongoDB();

const ProductosDaoMongoDb = require("../daos/productos.mongodb");
const productosDao = new ProductosDaoMongoDb();

const { getCurrentUser } = require("../middlewares/currentUser");
const { authMiddleware } = require("../middlewares/auth.middleware");

const { sendEmail } = require("../mensajes/email");
const { templateEmailCompra } = require("../templates/templateEmailCompra");

const { sendWhatsapp } = require("../mensajes/whatsapp");
const { templateWhatsapp } = require("../templates/templateWhatsapp");

const DtoCarrito = require("../dto/carrito.dto");

carritoRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const currentUser = await req.user;
    let carrito = await carritoDao.getCarritoByUser(currentUser);
    if (!carrito) {
      const carritoNew = {
        timestamp: new Date(),
        productos: [],
        user: currentUser,
      };
      carrito = await carritoDao.save(carritoNew);
    }

    const carritoDto = new DtoCarrito(carrito);
    const currentUserUI = await getCurrentUser(currentUser);

    res.render("carrito", { carrito: carritoDto, user: currentUserUI });
  } catch (err) {
    console.log(err);
  }
});
carritoRouter.get("/addProduct/:id", authMiddleware, async (req, res) => {
  try {
    const currentUser = await req.user;
    const carrito = await carritoDao.getCarritoByUser(currentUser);
    if (carrito && req.params.id) {
      const producto = await productosDao.getById(req.params.id);
      carrito.productos.push(producto);
      const carritoUpdated = await carritoDao.update(carrito.id, carrito);
      res.redirect("/carrito");
    }
  } catch (err) {
    console.log(err);
  }
});
carritoRouter.get("/deleteProduct/:id", authMiddleware, async (req, res) => {
  try {
    const currentUser = await req.user;
    const carrito = await carritoDao.getCarritoByUser(currentUser);
    if (carrito && req.params.id) {
      const producto = await productosDao.getById(req.params.id);
      const indexObjeto = carrito.productos.indexOf(producto);
      carrito.productos.splice(indexObjeto, 1);
      console.log(carrito.productos);
      const carritoUpdated = await carritoDao.update(carrito._id, carrito);
      res.redirect("/carrito");
    }
  } catch (err) {
    console.log(err);
  }
});

carritoRouter.get("/comprar", authMiddleware, async (req, res) => {
  try {
    const currentUser = await req.user;
    const carrito = await carritoDao.getCarritoByUser(currentUser);
    if (carrito) {
      const mailOptions = {
        from: "Servidor Node JS",
        to: "charlybackend2023@gmail.com",
        subject: `NUEVA COMPRA DE @${currentUser.username}!`,
        html: templateEmailCompra(carrito,currentUser),
      };



      //Envia el email
      const info = await sendEmail(mailOptions);
      //Envia el whatsapp
      const infoWhatsapp = await sendWhatsapp(templateWhatsapp(carrito,currentUser));
      
      const carritoDeleted = await carritoDao.deleteById(carrito._id)

      const currentUserUI = await getCurrentUser(currentUser);
      res.render("confirmarCompra", { user: currentUserUI });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  carritoRouter,
};
