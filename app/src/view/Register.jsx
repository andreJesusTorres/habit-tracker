import logic from '../logic';
import { Anchor, Button, Input, PasswordInput } from './library';
import { useNavigate } from 'react-router-dom';
import { errors as comErrors } from 'com';
import { useNotifications } from './hooks/useNotifications.jsx';
import { useState } from 'react';

const { SystemError } = comErrors;

export default function Register(props) {
    const navigate = useNavigate();
    const { alert } = useNotifications();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        passwordRepeat: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Ingresa un email válido';
        }
        
        // Validar username
        if (!formData.username.trim()) {
            newErrors.username = 'El nombre de usuario es requerido';
        } else if (formData.username.length < 3) {
            newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'El nombre de usuario solo puede contener letras, números y guiones bajos';
        }
        
        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
        }
        
        // Validar confirmación de contraseña
        if (!formData.passwordRepeat) {
            newErrors.passwordRepeat = 'Confirma tu contraseña';
        } else if (formData.password !== formData.passwordRepeat) {
            newErrors.passwordRepeat = 'Las contraseñas no coinciden';
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
            await logic.registerUser(formData.name, formData.email, formData.username, formData.password, formData.passwordRepeat);
            setFormData({
                name: '',
                email: '',
                username: '',
                password: '',
                passwordRepeat: ''
            });
            alert('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.', 'success');
            navigate('/login');
        } catch (error) {
            if (error instanceof SystemError) {
                alert('Error del servidor. Inténtalo más tarde.', 'error');
            } else {
                alert(error.message, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoginClick = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header con logo y título */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">Habíme</h1>
                        <img src="logo.png" alt="Logo de la app" className="w-16 h-16" />
                    </div>
                    <p className="text-gray-600">Únete a nosotros y comienza a mejorar tus hábitos</p>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crear Cuenta</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre Completo
                            </label>
                            <Input 
                                type="text" 
                                placeholder="Tu nombre y apellido" 
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                                }`} 
                            />
                            {formErrors.name && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <Input 
                                type="email" 
                                placeholder="tu@email.com" 
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                                }`} 
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de Usuario
                            </label>
                            <Input 
                                type="text" 
                                placeholder="Elige un nombre de usuario" 
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
                            <PasswordInput 
                                id="password" 
                                name="password"
                                placeholder="Crea una contraseña segura" 
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
                        
                        <div>
                            <label htmlFor="password-repeat" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Contraseña
                            </label>
                            <PasswordInput 
                                id="password-repeat" 
                                name="passwordRepeat"
                                placeholder="Repite tu contraseña" 
                                value={formData.passwordRepeat}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                    formErrors.passwordRepeat ? 'border-red-500' : 'border-gray-300'
                                }`} 
                            />
                            {formErrors.passwordRepeat && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.passwordRepeat}</p>
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
                                    Creando cuenta...
                                </>
                            ) : (
                                'Crear Cuenta'
                            )}
                        </Button>
                    </form>
                </div>

                {/* Enlace para iniciar sesión */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Anchor 
                            href="/login" 
                            onClick={handleLoginClick} 
                            className="text-blue-500 hover:text-blue-600 font-semibold hover:underline transition-colors"
                        >
                            Inicia sesión aquí
                        </Anchor>
                    </p>
                </div>
            </div>
        </div>
    );
}
