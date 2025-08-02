export default () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
        // Verificar si el token ha expirado decodificándolo
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Verificar si el token tiene los campos requeridos
        if (!payload.id || !payload.exp) {
            console.log('Token inválido: faltan campos requeridos');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            return false;
        }
        
        if (payload.exp < currentTime) {
            console.log('Token expirado');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            return false;
        }
        
        return true;
    } catch (error) {
        console.log('Error al validar token:', error.message);
        // Si el token está malformado, eliminarlo
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        return false;
    }
}