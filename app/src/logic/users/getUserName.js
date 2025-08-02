import { errors, handleApiError }  from 'com'
import { extractPayloadFromJWT } from '../../util'

const { SystemError } = errors

export default () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No hay token de autenticación');
    }
    
    try {
        const { id: userId } = extractPayloadFromJWT(token);
        if (!userId) {
            throw new Error('Token inválido: no contiene ID de usuario');
        }

        return fetch(`http://localhost:3000/users/${userId}/name`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .catch(error => { throw new SystemError(error.message) })
            .then(res => {
                if (res.ok)
                    return res.json()
                        .catch(error => { throw new SystemError(error.message) })
                        
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(({ error, message }) => { handleApiError(error, message) })
            })
    } catch (error) {
        throw new Error('Error al extraer ID de usuario del token');
    }
}

