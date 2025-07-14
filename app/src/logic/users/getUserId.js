import { extractPayloadFromJWT } from '../../util'

export default () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        const payload = extractPayloadFromJWT(token);
        return payload.sub;
    } catch (error) {
        console.error('Error extrayendo userId del token:', error);
        return null;
    }
}