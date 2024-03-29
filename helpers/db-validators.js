const { Categoria } = require('../models');
const role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (rol = '') => {
    const existeRol = await role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = "") => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}


const existeUsuarioPorId = async (id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
}
const existeCategoria = async (id) => {
    //Verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id).find({ estado: true })
    if (!existeCategoria) {
        throw new Error(`El id ${id} de categoria no existe`)
    }
}





module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria
}