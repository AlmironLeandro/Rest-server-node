//No es necesario el import 'const { response } = require('express')'
//este pero a diferencia de Typescript, cuando hago el 'res.algo()' 
//vsCode no me muestra las propiedades ya que no sabe de que tipo es.

const { response, request } = require('express')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const Usuario = require('../models/usuario')

const usuarioGet = (req = request, res = response) => {

    const { q, nombre, apikey } = req.query;
    // res.send('Hello world')
    // http://localhost:8081/api/usuarios?q=hola&apikey=123145123&nombre=leandro
    res.json({
        msj: 'Get data from controller',
        q,
        nombre,
        apikey
    })
}

const usuarioPost = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })

    if (existeEmail) {
        return res.status(400).json({
            msj: "Ese correo ya esta registrado"
        })
    }

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


const usuarioDelete = (req, res) => {
    // res.send('Hello world')
    res.json({
        msj: 'user delete from controller'
    })
}

const usuarioPut = (req, res) => {
    const id = req?.params.id;
    res.json({
        msj: 'Update user from controller',
        id
    })
}




module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioDelete,
    usuarioPatch,
    usuarioPut
}