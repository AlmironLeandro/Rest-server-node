const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.headers['x-token'];
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET)
        req.uid = uid
        const usuario = await Usuario.findById(uid)
        if (!usuario) {
            return res.status(401).json({ msg: 'Token no valido - usuario no encontrado' })
        }
        if (!usuario.estado) {
            return res.status(401).json({ msg: 'Token no valido - usuario no encontrado' })
        }
        req.usuario = usuario
        next()
    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    //next() es una funcion que se ejecuta cuando todo sale bien
    //si no se ejecuta next() el codigo se queda colgado
    // De donde viene la funcion next()?
    // next() viene de la funcion validarCampos que esta en el archivo validar-campos.js



}



module.exports = {
    validarJWT
}