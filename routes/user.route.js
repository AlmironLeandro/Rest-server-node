const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch } = require('../controllers/user.controller');
const router = Router();





router.get('/', usuarioGet);

router.put('/:id', usuarioPut);
router.put('/', usuarioPut);

router.post('/', [check('correo', 'El correo no es válido').isEmail()], usuarioPost);
router.delete('/', usuarioDelete);
router.patch('/', usuarioPatch);






module.exports = router