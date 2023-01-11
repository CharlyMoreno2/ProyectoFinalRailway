# Entrega Final #3 - Backend Coderhouse

Link produccion: https://proyectofinalrailway-production.up.railway.app/

👉 La aplicacion cuenta con un Login y un Register, toda la autenticacion se realizó con Passport vinculado todo a MongoDB

👉 Tambien cuenta con un apartado para ver productos, los cuales se pueden agregar al carrito. 

👉 Luego desde la vista de carrito podremos eliminar productos que ya no qureramos, veremos el total de la compra, y finalmente finalizar la compra.

👉 Al finalizar la compra se le envía un email al administrador del sistema (manejado por variables de entorno) y un whatsapp tambien al administrador del sistema indicando los productos pedidos.

A continuacion se dejan capturas de los respectivos mensajes.👇 

📧Email   
![Email](https://i.imgur.com/FaX9Ym7.png)

📱Whatsapp
![Whatsapp](https://i.imgur.com/z3BQxJz.jpg)

Además se incorporó la función de API para la seccion de productos con los siguientes endopoints.

- GET ``/api/productos`` => Devuelve todos los productos
- POST ``/api/productos`` => Agrega un nuevo producto.

    Body: 
    ```json 
    {
            "nombre": "",
            "timestamp": "",
            "precio": 0,
            "descripcion": "",
            "codigo": "",
            "foto": "",
            "stock": 0
    }
    ```

Espero que la entrega cumpla con lo requerido. Abrazo grande!

