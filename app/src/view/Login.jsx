import { Anchor, Button, Input } from './library';
import logic from '../logic';
import { errors as comErrors } from 'com';
import useContext from './useContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { SystemError } = comErrors;

export default function Login(props) {
    const { alert } = useContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.username.trim()) {
            newErrors.username = 'El usuario o email es requerido';
        }
        
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await logic.loginUser(formData.username, formData.password);
            setFormData({ username: '', password: '' });
            props.onLoggedIn();
        } catch (error) {
            if (error instanceof SystemError) {
                alert('Error del servidor. Inténtalo más tarde.');
            } else {
                alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = (event) => {
        event.preventDefault();
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header con logo y título */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">Hábitos</h1>
                        <img src="logo.png" alt="Logo de la app" className="w-16 h-16" />
                    </div>
                    <p className="text-gray-600">Inicia sesión para continuar con tus hábitos</p>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Usuario o Email
                            </label>
                            <Input
                                type="text"
                                placeholder="Ingresa tu usuario o email"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                    formErrors.username ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {formErrors.username && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <Input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {formErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                            )}
                        </div>
                        
                        <Button
                            type="submit"
                            disabled={loading}
                            variant="primary"
                            size="lg"
                            className="w-full mt-6"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Iniciando sesión...
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </Button>
                    </form>
                </div>

                {/* Enlace para registrarse */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <Anchor 
                            href="/register"
                            onClick={handleRegisterClick} 
                            className="text-blue-500 hover:text-blue-600 font-semibold hover:underline transition-colors"
                        >
                            Regístrate aquí
                        </Anchor>
                    </p>
                </div>
            </div>
        </div>
    );
}
