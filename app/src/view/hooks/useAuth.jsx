import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../logic/users';

export const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar estado de autenticación al cargar la aplicación
        const checkAuth = () => {
            if (!isUserLoggedIn()) {
                // Limpiar cualquier dato restante y redirigir al login
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
                navigate('/login');
            }
        };

        // Verificar autenticación al montar
        checkAuth();

        // Verificar autenticación cuando la ventana gana foco (usuario regresa a la pestaña)
        const handleFocus = () => {
            checkAuth();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return { logout };
}; 