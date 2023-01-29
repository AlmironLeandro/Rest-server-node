const { Router } = require('express');
const { validarJWT, validarCampos } = require('../middlewares');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerUnaCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoria.controller');
const { existeCategoria } = require('../helpers/db-validators');


const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Crear categoria - privada - cualquier persona con un token valido
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearCategoria)

// Obtener una categoria por id - publico
router.get('/:id',
    [
        check('id', 'No es una id de mongo').isMongoId(),
        check('id', 'No es una id de categoria').custom(existeCategoria),
        validarCampos
    ]
    , obtenerUnaCategoria)


// Actualizar una categoria - privado - cualquiera con token valido

router.put('/:id',
    [
        validarJWT,
        check('id').isMongoId(),
        check('id').custom(existeCategoria),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , actualizarCategoria)

// Borrar una categoria -  Administrador

router.delete('/:id',
    [
        validarJWT,
        check('id').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos
    ]
    , borrarCategoria)


module.exports = router