class DtoProducto {
    constructor(producto) {
        this.nombre= producto.nombre,
        this.precio= producto.precio,
        this.foto=   producto.foto,
        this.id= producto._id,
        this.descripcion= producto.descripcion
    }
}

function getListDtoProductos(productos){
    const productosArray = []
    productos.forEach(element =>{
        productosArray.push(new DtoProducto(element))
    })
    return productosArray;
}
  
 module.exports = {getListDtoProductos};
  