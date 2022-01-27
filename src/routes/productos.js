const db = require('../db/dataBase');
const compras = require('../models/compras');
const usuarioModel = require('../models/usuario');
const producto = require('../models/productos')

const router = require('express').Router()

// Obtener todos los productos
router.get('/', async(req, res) => {
    const productos = await producto.findAll();
    if (productos.length == 0) {
        return res.json({
            error: "No se encontro informacion"
        })
    }
    res.json(productos);
})

// Obtener un solo producto
router.get('/findProducto/:id', async(req, res) => {
    const { id } = req.params;
    const getProducto = await producto.findByPk(id)
    if (getProducto == undefined) {
        return res.json({
            error: "No se encontro informacion con este id"
        })
    }
    res.json(getProducto)
})

// crear un producto
router.post('/crearProducto', async(req, res) => {
    const { numeroLote, nombre, precio, cantidad, fechaIngreso } = req.body;
    if (!numeroLote || !nombre || !precio || !cantidad || !fechaIngreso) {
        return res.status(400).json({
            error: "uno o más campos estan vacios"
        })
    }
    const crearProducto = await producto.create({
        nombre,
        numeroLote,
        precio,
        cantidad,
        fechaIngreso
    })
    res.json(crearProducto)
})

router.put('/updateProducto', async(req, res) => {
    const { id, numeroLote, nombre, precio, cantidad, fechaIngreso } = req.body;
    if (!numeroLote || !nombre || !precio || !cantidad || !fechaIngreso) {
        return res.status(400).json({
            error: "uno o más campos estan vacios"
        })
    }
    const updateProducto = await producto.upsert({
        id,
        nombre,
        numeroLote,
        precio,
        cantidad,
        fechaIngreso
    })
    res.json(updateProducto)
})

router.delete('/deleteProducto/:id', async(req, res) => {

    const { id } = req.params;
    console.log(id);
    db.query('DELETE FROM productos WHERE id = ' + id, (error, result) => {
        if (error) throw error;
        res.send('User deleted.');
    });
})

router.post('/crearUsuario', async(req, res) => {
    const { nombre, apellido, usuario, contrasena, rol } = req.body;
    if (!nombre || !apellido || !usuario || !contrasena || !rol) {
        return res.status(400).json({
            error: "uno o más campos estan vacios"
        })
    }
    const crearUsuario = await usuarioModel.create({
        nombre,
        apellido,
        usuario,
        contrasena,
        rol
    })
    res.json(crearUsuario)
})

router.post('/crearCompra/:idCliente', async(req, res) => {
    const { idCliente } = req.params;
    const { comprasList } = req.body;

    let crearUsuario;
    console.log(comprasList)
    let listaFinal = [];
    for (const key of comprasList) {
        const getProducto = await producto.findByPk(key.idProducto)
        const getCliente = await usuarioModel.findByPk(idCliente)
        let nombreProducto = getProducto.get().nombre
        let nombreCliente = getCliente.get().nombre + " " + getCliente.get().apellido

        let idProducto = key.idProducto
        let cantidad = key.cantidad
        crearUsuario = await compras.create({
            idCliente,
            idProducto,
            cantidad,
            nombreProducto,
            nombreCliente
        })
        listaFinal.push(crearUsuario)
    }
    res.json(listaFinal)
});

// Obtener todos las compras
router.get('/traerCompras', async(req, res) => {
    console.log("entro")
    const findAllCompras = await compras.findAll();

    if (findAllCompras.length == 0) {
        return res.json({
            error: "No se encontro informacion"
        })
    }
    res.json(findAllCompras);
});


// Obtener compras por cliente
router.get('/compraByCliente/:idCliente', async(req, res) => {
    const { idCliente } = req.params;
    db.query('select c.nombreProducto,sum(c.cantidad) cantidad, sum(c.cantidad)*p.precio total  from compras as c join productos as p on p.id=c.idProducto where c.idCliente= ' + idCliente, (error, result) => {
        console.log(result)
        if (error) throw error;
        // res.json({
        //     compraTotal
        // });
        res.send(result)
    });
})

module.exports = router;