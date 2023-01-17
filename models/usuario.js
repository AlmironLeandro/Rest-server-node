const { Schema, model } = require('mongoose');



const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// UsuarioSchema.methods.toJSON = function () {

//     const { __v, password, ...usuario } = this.ToObject()
//     return usuario

// }


module.exports = model('Usuario', UsuarioSchema)