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
                        alert('Sorry, try again later.');
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
        <main className="justify-self-center h-full ">
            {/* Div para el logo y el título */}
            <div className="flex items-center justify-around mb-[32px] mt-[32px]  ">
                <h1 className="text-[30px] font-bold">Hábitos</h1>
                <img src= "logo.png"  alt="Logo de la app" className="w-[64px] h-[64px]" />
            </div>

            <h2 className="text-[24px] font-bold ml-[32px]"> Login </h2>

            {/* Formulario */}
            <Form onSubmit={handleSubmit} className="bg-white p-[32px] rounded-lg shadow-md w-[320px] mb-[16px]">
                <Input
                    type="text"
                    placeholder="Username or email"
                    id='username'
                    className="w-4/5 mb-6 mx-auto px-4 py-2 border border-gray-300 rounded"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    id='password'
                    className="w-4/5 mb-6 mx-auto px-4 py-2 border border-gray-300 rounded"
                />
                <Button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
                >
                    Login 
                </Button>
                
                
            </Form>

            {/* Enlace para registrarse */}
            <div className="mt-[16px]">
                <Anchor href="/register"
                onClick={handleRegisterClick} className="text-blue-500 hover:underline">
                    Si no tienes cuenta, <strong>aquí</strong>
                </Anchor>
            </div>
        </main>
    );
}
