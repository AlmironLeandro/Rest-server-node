const { response, request, json } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google0verify");



const login = async (req = request, res = response) => {
    const { password, correo } = req.body;
    const query = { correo }

    try {
        const usuario = await Usuario.findOne(query)
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!usuario || !usuario.estado || !validPassword) {
            return res.status(400).json({
                msj: 'Usuario / password no son correctos',
                validPassword,

            })
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msj: 'Login ok',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: "Hable con el administrador"
        })
    }

}

const googleSingIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo: googleUser.correo });

        if (!usuario) {
            const data = {
                nombre: googleUser.nombre,
                correo: googleUser.correo,
                password: ':P',
                img: googleUser.img,
                google: true,
                rol: 'USER_ROLE'
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msj: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id);
        res.json({
            msj: 'Google Sing In',
            token,
            usuario
        })
    } catch (error) {
        res.status(400)
            .json({
                msj: 'Token de google no es valido',
                error
            })
    }
}

module.exports =
{
    login,
    googleSingIn
}