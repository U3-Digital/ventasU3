const express = require('express');
let { verificaToken } = require('../middlewares/autenticacion');
let app = express();
let Pedido = require('../models/producto');

app.post('/pedidos', verificaToken, (req, res) => {

    let body = req.body;

    let pedido = new Pedido({
        idClientePedido: body.idCliente,
        idVendedorPedido: body.idVendedor,
        idCatalogoPedido: body.idCatalogo,
        productosPedido: body.productos,
        totalPedido: body.total
    });

});

module.exports = app;