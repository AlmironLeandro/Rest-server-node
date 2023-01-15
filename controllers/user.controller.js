//No es necesario el import 'const { response } = require('express')'
//este pero a diferencia de Typescript, cuando hago el 'res.algo()' 
//vsCode no me muestra las propiedades ya que no sabe de que tipo es.

const { response, request } = require('express')











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

const usuarioPost = (req, res) => {
    const { nombre, edad } = req.body

    res.json({
        msj: 'New user created from controller',
        nombre,
        edad
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