const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch } = require('../controllers/user.controller');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();





router.get('/', usuarioGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPut);

router.put('/', usuarioPut);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
        check('rol').custom(esRoleValido),
        validarCampos
    ], usuarioPost);


router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

], usuarioDelete);
router.patch('/', usuarioPatch);






module.exports = router