//No es necesario el import 'const { response } = require('express')'
//este pero a diferencia de Typescript, cuando hago el 'res.algo()' 
//vsCode no me muestra las propiedades ya que no sabe de que tipo es.

const { response } = require('express')











const usuarioGet = (req, res) => {
    // res.send('Hello world')
    res.json({
        msj: 'Get data from controller'
    })
}





















module.exports = {
    usuarioGet
}