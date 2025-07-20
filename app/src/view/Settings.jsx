import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutUser from '../logic/users/logoutUser';
import getUserDetails from '../logic/users/getUserDetails';
import updateUser from '../logic/users/updateUser';
import { useNotifications } from './hooks/useNotifications.jsx';

export default function Settings() {
    const { alert } = useNotifications();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    async function fetchUser() {
        setLoading(true);
        try {
            const user = await getUserDetails();
            setName(user.name || '');
            setEmail(user.email || '');
        } catch (error) {
            alert('No se pudieron cargar los datos del usuario', 'error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateUser({ name, email });
            alert('Datos actualizados correctamente', 'success');
        } catch (error) {
            alert('No se pudo actualizar el usuario', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Configuración</h1>
                    <p className="text-sm text-gray-500 text-center mt-1">Gestiona tu cuenta y preferencias</p>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4">
                <div className="max-w-md mx-auto">
                    {/* Información del perfil */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del Perfil</h2>
                        
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                <span className="ml-2 text-gray-600">Cargando datos...</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Acciones de cuenta */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Acciones de Cuenta</h2>
                        
                        <div className="space-y-3">
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                            >
                                <span>🚪</span>
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}