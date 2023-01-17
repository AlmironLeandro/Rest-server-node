//No es necesario el import 'const { response } = require('express')'
//este pero a diferencia de Typescript, cuando hago el 'res.algo()' 
//vsCode no me muestra las propiedades ya que no sabe de que tipo es.

const { response, request } = require('express')
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario')

const usuarioGet = async (req = request, res = response) => {
    const { limit = 0, desde = 0 } = req.query
    const query = { estado: true }
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limit))
    // const total = await Usuario.count(query)

    const [total, usuarios] = await Promise.all(
        [
            Usuario.count(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limit))

        ]
    )

    res.json({
        total, usuarios
        // total,
        // usuarios
    })
}

const usuarioPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body

    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = await bcrypt.hashSync(password, salt);

    await usuario.save()
    res.json({
        usuario
    })
}


const usuarioPatch = (req, res) => {
    res.json({
        msj: 'Ni puta idea todavia lo que hace el metodo http patch'
    })
}


const usuarioDelete = async (req, res) => {

    const { id } = req.params
    const query = { estado: false }
    // const eliminado = await Usuario.findByIdAndDelete(id)
    const usuario = await Usuario.findByIdAndUpdate(id, query)
    res.json({
        usuario
    })
}

const usuarioPut = async (req, res) => {
    const id = req?.params.id;
    const { password, google, correo, _id, ...resto } = req.body
    //Validar
    if (password) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        resto.password = await bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}





module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioDelete,
    usuarioPatch,
    usuarioPut
}