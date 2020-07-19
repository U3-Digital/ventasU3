var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('./producto');

let today = new Date();
let date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

var pedidoSchema = new Schema({
    fechaPedido: { type: String, default: `${date}T${time}` },
    idClientePedido: { type: Schema.Types.ObjectId, ref: 'Cliente', required: [true, 'El id del cliente es necesario'] },
    idVendedorPedido: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id del vendedor es necesario'] },
    idCatalogoPedido: { type: Schema.Types.ObjectId, ref: 'Catalogo', required: [true, 'El id del catalogo es necesario'] },
    productosPedido: [{
        codigoProducto: String,
        nombreProducto: String,
        idCatalogoProducto: String,
        precioProducto: String,
        cantidadProducto: String,
        statusProducto: String
    }],
    totalPedido: { type: Number, required: [true, 'El total es necesario'] }
});

module.exports = mongoose.model('Pedido', pedidoSchema);