import { Anchor, Button, Form, Input } from './library';
import logic from '../logic';
import { errors } from 'com';
import useContext from './useContext';

const { SystemError } = errors;

export default function Login(props) {
    const { alert } = useContext();

    const handleSubmit = event => {
        event.preventDefault();

        const { target: { username: { value: username }, password: { value: password } } } = event;

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset();
                    props.onLoggedIn();
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

    const handleRegisterClick = event => {
        event.preventDefault();
        props.onRegisterClick();
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
                    
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Usuario o Email
                            </label>
                            <Input
                                type="text"
                                placeholder="Ingresa tu usuario o email"
                                id='username'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <Input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                id='password'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium text-lg"
                        >
                            Iniciar Sesión
                        </Button>
                    </Form>
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
