var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Producto = require('./producto');

var pedidoSchema = new Schema({
    fechaPedido: { type: Date, default: Date.now },
    idClientePedido: { type: Schema.Types.ObjectId, ref: 'Cliente', required: [true, 'El id del cliente es necesario'] },
    idVendedorPedido: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El id del vendedor es necesario'] },
    idCatalogoPedido: { type: Schema.Types.ObjectId, ref: 'Catalogo', required: [true, 'El id del catalogo es necesario'] },
    productosPedido: { type: [Producto], required: [true, 'Los productos son necesarios'] },
    totalPedido: { type: Number, required: [true, 'El total es necesario'] }
});

module.exports = mongoose.model('Pedido', pedidoSchema);