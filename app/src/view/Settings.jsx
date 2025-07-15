import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutUser from '../logic/users/logoutUser';
import getUserDetails from '../logic/users/getUserDetails';
import updateUser from '../logic/users/updateUser';

export default function Settings() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const user = await getUserDetails();
                setName(user.name || '');
                setEmail(user.email || '');
            } catch (error) {
                alert('No se pudieron cargar los datos del usuario');
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true);
            await updateUser({ name, email });
            alert('Datos actualizados correctamente');
        } catch (error) {
            alert('No se pudo actualizar el usuario');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <div className="settings-container max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Configuración</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    disabled={loading}
                />
            </div>
            <button
                onClick={handleSave}
                className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                disabled={loading}
            >
                Guardar Cambios
            </button>
            <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white p-2 rounded"
                disabled={loading}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}