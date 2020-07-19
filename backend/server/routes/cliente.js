const express = require('express');
const bcrypt = require('bcrypt');
let { verificaToken } = require('../middlewares/autenticacion.js');
let app = express();
let Cliente = require('../models/cliente.js');
const cliente = require('../models/cliente.js');


// // ========================================
// // Mostrar todos los Clientes
// // ========================================
// app.get('/cliente', (req, res)=>{

// });

// // ========================================
// // Mostrar Clientes por ID
// // ========================================
// app.get('/cliente/:id', (req, res)=>{
// 	//Cliente.findById
// });

// ========================================
// Crear nuevo Cliente
// ========================================
app.post('/cliente', verificaToken, (req, res) => {
    // Regresar la nueva categoria
    // req.usuario._id
    let body = req.body;

    let cliente = new Cliente({
        nombres: body.nombres,
        apellidos: body.apellidos,
        telefono: body.telefono,
        email: body.email,
        adeuda: body.adeuda,
        compras: body.compras,
        vendedor: body.vendedor
    });

    cliente.save((err, clienteDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!clienteDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cliente: clienteDB
        });


    });


});

app.get('/cliente/:idVendedor', verificaToken, (req, res) => {

    let idVendedor = req.params.idVendedor;

    Cliente.find({ vendedor: idVendedor }, '', )
        .exec((err, clientes) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                clientes
            });
        });
});


// ========================================
// Actualizar Clientes por ID
// ========================================
app.put('/cliente/:idCliente', verificaToken, (req, res) => {

    let id = req.params.idCliente;
    let body = req.body;

    Cliente.findById(id, (err, clienteDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El cliente no existe'
                }
            });
        }
        let comprasNuevas = parseFloat(body.comprasCliente);
        let comprasActuales = parseFloat(clienteDB.compras);

        let adeudaNueva = parseFloat(body.adeudaCliente);
        let adeudaActual = parseFloat(clienteDB.adeuda);

        clienteDB.compras = comprasNuevas + comprasActuales;
        clienteDB.adeuda = adeudaNueva + adeudaActual;

        clienteDB.save((err, clienteGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                clienteGuardado
            });
        });

    });
});

app.put('/clienteadeuda/:idCliente', verificaToken, (req, res) => {
    let id = req.params.idCliente;
    let body = req.body;

    Cliente.findById(id, (err, clienteDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El ciente no existe'
                }
            });
        }
        let adeudaNueva = parseFloat(clienteDB.adeuda) - parseFloat(body.adeudaCliente);
        if (adeudaNueva < 0) {
            return res.status(400).json({
                ok: false,
                err: 'El abono no puede ser mayor a la deuda'
            });
        }

        clienteDB.adeuda = adeudaNueva;

        clienteDB.save((err, clienteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                clienteGuardado
            });
        });

    });
});

// // ========================================
// // Borra Clientes por ID
// // ========================================
// app.delete('/cliente/id', verificaToken, (req, res)=>{
// 	// Solo la puede borrar un administrador
// });




module.exports = app;