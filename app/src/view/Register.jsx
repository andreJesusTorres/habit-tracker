import { Anchor, Button, Form, Input, PasswordInput } from './library';
import logic from '../logic';
import { errors } from 'com';
import useContext from './useContext';
import { useNavigate } from 'react-router-dom';

const { SystemError } = errors;

export default function Register(props) {
    const { alert } = useContext();
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();

        const { target: { name: { value: name }, email: { value: email }, username: { value: username }, password: { value: password }, passwordRepeat: { value: passwordRepeat } } } = event;

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    event.target.reset();
                    props.onRegistered();
                    navigate("/login")
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
        navigate('/login')
    };

    return (
        <main className='flex flex-col items-center justify-center min-h-screen'>
            {/* Encabezado */}
            <div className='flex items-center justify-between w-4/5 max-w-md mb-4'>
                <h1 className='text-3xl font-bold'>Habime</h1>
                <img src="logo.png" alt='Logo de la app' className='w-16 h-16' />
            </div>

            <h2 className='text-2xl font-semibold mb-2'>Registro</h2>

            <Form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-4/5 max-w-md space-y-4'>
                <Input type='text' placeholder='Nombre y Apellido' className='w-full px-4 py-2 border border-gray-300 rounded' />
                <Input type='email' placeholder='E-mail' className='w-full px-4 py-2 border border-gray-300 rounded' />
                <Input type='text' placeholder='Usuario' className='w-full px-4 py-2 border border-gray-300 rounded' />
                <PasswordInput id='password' placeholder='Contraseña' className='w-full px-4 py-2 border border-gray-300 rounded' />
                <PasswordInput id='password-repeat' placeholder='Confirmar contraseña' className='w-full px-4 py-2 border border-gray-300 rounded' />
                
                <Button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-all'>Registrarse</Button>
            </Form>

            {/* Enlace para iniciar sesión */}
            <div className='mt-6 text-center'>
                <span>¿Ya tienes cuenta?</span>
                <Anchor href='/login' onClick={handleLoginClick} className='cursor-pointer text-blue-500 hover:underline ml-1 font-semibold'>Inicia sesión aquí</Anchor>
            </div>
        </main>
    );
}
