const { response, request } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const login = async (req = request, res = response) => {
    const { password, correo } = req.body;
    const query = { correo }
    console.log(query);


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


module.exports =
{
    login
}