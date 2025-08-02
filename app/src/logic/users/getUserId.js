import { extractPayloadFromJWT } from '../../util'

export default () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No hay token de autenticación');
    }
    
    try {
        const payload = extractPayloadFromJWT(token);
        if (!payload.id) {
            throw new Error('Token inválido: no contiene ID de usuario');
        }
        return payload.id;
    } catch (error) {
        throw new Error('Error al extraer ID de usuario del token');
    }
}