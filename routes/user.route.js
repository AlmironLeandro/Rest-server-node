const { Router } = require('express');
const { usuarioGet } = require('../controllers/user.controller');



const router = Router();


router.get('/', usuarioGet)
router.put('/', (req, res) => {
    // res.send('Hello world')
    res.json({
        msj: 'Update data'
    })
})
router.post('/', (req, res) => {
    // res.send('Hello world')
    res.json({
        msj: 'New data created'
    })
})
router.delete('/', (req, res) => {
    // res.send('Hello world')
    res.json({
        msj: 'Delete data Ok'
    })
})







module.exports = router