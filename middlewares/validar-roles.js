
const esAdminRol = (req, res, next) => {
    if (!req.usuario) {
        return res.status(500).json({ msg: 'Se quiere verificar el rol sin validar el token primero' })
    }
    const { rol, nombre } = req.usuario
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({ msg: `${nombre} no es administrador` })
    }
    next()
}

const tieneRol = (...roles) => {
    return (req, res, next) => {
        console.log(req.usuario);
        if (!req.usuario) {
            return res.status(500).json({
                msj: "Se quiere verificar el role sin validar el token primero"
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msj: "El usuario no esta autorizado para esta petición"
            })
        }
        next()
    }

}


module.exports = {
    esAdminRol,
    tieneRol
}