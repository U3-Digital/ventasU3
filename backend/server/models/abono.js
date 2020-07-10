var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var abonoSchema = new Schema({
    fecha: { type: Date, default: Date.now },
    cantidad: { type: Number, required: [true, 'El porcentaje de ganancia es necesario'] },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: [true, 'El id del cliente es necesario'] },
    vendedor: { type: Schema.Types.ObjectId, ref: 'Vendedor', required: [true, 'El id del vendedor es necesario'] }
});


module.exports = mongoose.model('Abono', abonoSchema);