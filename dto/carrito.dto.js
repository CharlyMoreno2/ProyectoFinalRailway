class DtoCarrito {
  constructor(carrito) {
    this.productos = [];
    this.total = 0;
    if (carrito.productos.length > 0) {
      carrito.productos.forEach((element) => {
        this.productos.push({
          nombre: element.nombre,
          precio: element.precio,
          id: element._id,
        });
        this.total += element.precio;
      });
    }
  }
}

module.exports = DtoCarrito;
