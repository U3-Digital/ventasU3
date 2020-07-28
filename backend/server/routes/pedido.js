const express = require('express');
let { verificaToken } = require('../middlewares/autenticacion');
let app = express();
let Pedido = require('../models/pedido');

app.post('/pedidos', verificaToken, (req, res) => {

    let body = req.body;
    let pedido = new Pedido({
        idClientePedido: body.idClientePedido,
        idVendedorPedido: body.idVendedorPedido,
        idCatalogoPedido: body.idCatalogoPedido,
        productosPedido: body.productosPedido,
        totalPedido: body.totalPedido
    });

    pedido.save((err, pedidoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!pedidoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            pedidoDB
        });
    });

});

app.get('/pedidos', verificaToken, (req, res) => {
    Pedido.find({}, '').exec(
        (err, pedidos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                pedidos
            });
        }
    );
});

app.get('/pedidos/:idVendedor', verificaToken, (req, res) => {

    let idVendedor = req.params.idVendedor;
    Pedido.find({ idVendedorPedido: idVendedor }, '').exec(
        (err, pedidos) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                pedidos
            });
        }
    );

});

app.get('/pedidos/portipo/:tipo', verificaToken, (req, res) => {

    let tipo = req.params.tipo;
    let idVendedor = req.body.idVendedor;
    Pedido.find({ idVendedorPedido: idVendedor, status: tipo }).exec(
        (err, pedidos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!pedidos) {
                return res.status(404).json({
                    ok: false,
                    error: {
                        message: 'No se encontraron pedidos'
                    }
                });
            }

            res.json({
                ok: true,
                pedidos
            });
        }
    );

});

module.exports = app;