import logic from '../logic';
import { Anchor, Button, Form, Input, PasswordInput } from './library';
import { useNavigate } from 'react-router-dom';
import { errors } from 'com';
import useContext from './useContext';

const { SystemError } = errors;

export default function Register(props) {
    const navigate = useNavigate();
    const { alert } = useContext();

    const handleSubmit = event => {
        event.preventDefault();

        const { target: { name: { value: name }, email: { value: email }, username: { value: username }, password: { value: password }, 'password-repeat': { value: passwordRepeat } } } = event;

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    event.target.reset();
                    navigate('/login');
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Lo siento, inténtalo más tarde.');
                    else
                        alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLoginClick = event => {
        event.preventDefault();
        navigate('/login');
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
                    <p className="text-gray-600">Únete a nosotros y comienza a mejorar tus hábitos</p>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crear Cuenta</h2>
                    
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre Completo
                            </label>
                            <Input 
                                type='text' 
                                placeholder='Tu nombre y apellido' 
                                id='name'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <Input 
                                type='email' 
                                placeholder='tu@email.com' 
                                id='email'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de Usuario
                            </label>
                            <Input 
                                type='text' 
                                placeholder='Elige un nombre de usuario' 
                                id='username'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <PasswordInput 
                                id='password' 
                                placeholder='Crea una contraseña segura' 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password-repeat" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Contraseña
                            </label>
                            <PasswordInput 
                                id='password-repeat' 
                                placeholder='Repite tu contraseña' 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                            />
                        </div>
                        
                        <Button 
                            type='submit' 
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium text-lg"
                        >
                            Crear Cuenta
                        </Button>
                    </Form>
                </div>

                {/* Enlace para iniciar sesión */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Anchor 
                            href='/login' 
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
