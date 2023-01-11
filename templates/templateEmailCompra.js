function templateEmailCompra (carrito,user) {
    let total = 0;
    let html = `
        <h1> Nuevo pedido de ${user.nombre}! </h1>
        <p> El usuario @${user.username} realizó el siguiente pedido: </p>
        <div>
        <p>
    `
    carrito.productos.forEach((producto,index) =>{
        total += producto.precio
        html += `${index+1} - ${producto.nombre} - $ ${producto.precio} <br>`
    })
    html += `</p>
    <h3> Total: $ ${total} </h3>
    </div>
    <p>Programa realizado en NodeJS por Charly Moreno para Coderhouse</p>`
    return html
}

module.exports = {templateEmailCompra};