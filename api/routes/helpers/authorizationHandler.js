import { errors } from 'com'
import jwt from 'jsonwebtoken'

const { AuthorizationError } = errors

export default (req, res, next) => {
    try {
        // Extraer token del header
        const token = req.headers.authorization?.slice(7)
        console.log('Token recibido:', token ? 'Sí' : 'No');

        // Verificar token
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
        console.log('UserId extraído:', userId);

        // Guardar en request
        req.user = { id: userId }

        next()
    } catch (error) {
        console.log('Error en autorización:', error.message);
        next(new AuthorizationError(error.message))
    }
}