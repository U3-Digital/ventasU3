const express = require('express');
let { verificaToken } = require('../middlewares/autenticacion');
let app = express();
let Producto = require('../models/producto');

app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        codigoProducto: body.codigo,
        nombreProducto: body.nombre,
        idCatalogoProducto: body.idCatalogo,
        precioProducto: body.precio,
        cantidadProducto: body.cantidad
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });
});

module.exports = app;