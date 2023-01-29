const { response, request, query } = require("express");
const { Categoria } = require('../models')


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json(
            {
                msj: `La categoria ${categoriaDB.nombre} ya existe`
            }
        )
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoriaCreada = new Categoria(data);

    await categoriaCreada.save();
    res.status(201).json({
        categoriaCreada
    })
}

const obtenerCategorias = async (req, res) => {
    const { limit = 0, desde = 0 } = req.query
    const query = { estado: true }
    const [total, categorias] = await Promise.all(
        [
            Categoria.count(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limit))

        ]
    )

    res.status(200).json({
        total,
        categorias
    })

}
//FIXME: Verificar / Arreglar el params id que va en findById

const obtenerUnaCategoria = async (req = request, res) => {
    const query = { estado: true }
    const { id } = req.params
    const categoria = await Categoria.findById({ _id: id }).find(query)
    if (!categoria || categoria.length === 0) {
        return res.status(200).json({
            msj: `No se ha encontrado alguna categoria con la id ${id}`
        })
    }
    return res.status(200).json({
        categoria
    })
}

const actualizarCategoria = async (req, res) => {
    const { id } = req.params
    const { estado, usuario, ...data } = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({
        categoria
    })
}

const borrarCategoria = async (req = request, res) => {
    const { id } = req.params
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
    if (!categoria) {
        res.status(200).json({
            msj: `No se ha encontrado alguna categoria con la id ${id}`
        })
    }
    res.status(200).json({
        categoria
    })
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerUnaCategoria,
    actualizarCategoria,
    borrarCategoria
}