function templateWhatsapp (carrito,user) {
    let total = 0;
    let mensaje = `*Nuevo pedido de ${user.nombre}!* \n El usuario @${user.username} realizó el siguiente pedido:\n\n`
    carrito.productos.forEach((producto,index) =>{
        total += producto.precio
        mensaje += `${index+1} - ${producto.nombre} - *$ ${producto.precio}* \n`
    })
    mensaje += `\nTotal: *$ ${total}*\n\n_Programa realizado en NodeJS por Charly Moreno para Coderhouse_`
    return mensaje
}

module.exports = {templateWhatsapp};