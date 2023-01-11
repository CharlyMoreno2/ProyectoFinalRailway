const ContenedorArchivo = require("../contenedores/ContenedorArchivo.js");

class PaisesDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("./db/paises.json");
    }
}
module.exports = PaisesDaoArchivo;