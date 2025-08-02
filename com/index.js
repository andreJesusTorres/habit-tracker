import validate from './validate.js'
import errors from './errors.js'

const handleApiError = (error, message) => {
    const ErrorClass = errors[error];
    if (ErrorClass) {
        // Si es un error de autorización, limpiar localStorage y redirigir al login
        if (error === 'AuthorizationError' || error === 'CredentialsError') {
            if (typeof window !== 'undefined') {
                console.log('Error de autenticación detectado, limpiando localStorage');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
                
                // Redirigir al login después de un breve retraso
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
        }
        throw new ErrorClass(message);
    } else {
        throw new errors.SystemError(message);
    }
};

export {
    validate,
    errors,
    handleApiError
}