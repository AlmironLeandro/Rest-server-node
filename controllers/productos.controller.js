const { response, request, query } = require("express");
const { Producto } = require('../models')

//Creando producto nuevo
const nuevoProducto = async (req = request, res = response) => {

    const nombre = req.body.nombre.toLowerCase();

    const productoNuevo = await Producto.findOne({ nombre })

    if (productoNuevo) {
        return res.status(400).json(
            {
                msj: `La categoria ${productoNuevo.nombre} ya existe`
            }
        )
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const productoCreado = new Producto(data);

    await productoCreado.save();
    res.status(201).json({
        productoCreado
    })
}

// Get all de todos los productos

const getProductos = async (req, res) => {
    const { limit = 0, desde = 0 } = req.query
    const query = { estado: true }
    const [total, productos] = await Promise.all(
        [
            Producto.count(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limit))

        ]
    )

    res.status(200).json({
        total,
        productos
    })

}
// Get a determinado producto

const getProducto = async (req = request, res) => {
    const query = { estado: true }
    const { id } = req.params
    const producto = await Producto.findById({ _id: id }).find(query)
    if (!producto || producto.length === 0) {
        return res.status(200).json({
            msj: `No se ha encontrado alguna categoria con la id ${id}`
        })
    }
    return res.status(200).json({
        producto
    })
}
// Actualizar un producto
const updateProducto = async (req, res) => {
    const { id } = req.params
    const { estado, usuario, ...data } = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({
        producto
    })
}
// Update del estado por false
const deleteProducto = async (req = request, res) => {
    const { id } = req.params
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    if (!producto) {
        res.status(200).json({
            msj: `No se ha encontrado alguna categoria con la id ${id}`
        })
    }
    res.status(200).json({
        producto
    })
}



module.exports = {
    nuevoProducto,
    getProductos,
    deleteProducto,
    getProducto,
    updateProducto
}