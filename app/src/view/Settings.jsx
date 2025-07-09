import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutUser from '../logic/users/logoutUser';

export default function Settings() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();

    const handleSave = () => {
        // Logica para guardar la configuración
        console.log('Settings saved:', { username, email, theme });
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <div className="settings-container max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
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
                />
            </div>
            <div className="mb-4">
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
                <select
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <button
                onClick={handleSave}
                className="w-full bg-blue-500 text-white p-2 rounded mb-4"
            >
                Save Settings
            </button>
            <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white p-2 rounded"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}