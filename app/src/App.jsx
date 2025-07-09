import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login, Register, Goals, Progress, Habits, Diary, Settings } from './view';
import { HabitCategory, Footer, HabitSelection } from './view/components';
import { isUserLoggedIn } from './logic/users';
import { Context } from './view/useContext';

export default function App() {
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();
    const handleGoToHabits = () => {
        navigate('/habits');
    };

    // Función para mostrar alertas
    const alert = (msg) => {
        setAlertMessage(msg);
        setTimeout(() => setAlertMessage(null), 2000);
    };

    return (
        <Context.Provider value={{ alert }}>
            <div className="flex flex-col min-h-screen">
                {/* Mensaje de alerta visual */}
                {alertMessage && (
                    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded shadow-lg z-50 text-lg animate-fade-in">
                        {alertMessage}
                    </div>
                )}
                <main className="flex-grow">
                    {!isUserLoggedIn() ? (
                        <Routes>
                            {/* Lo primero que se ve es Register */}
                            <Route path="/" element={<Navigate to="/register" replace />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login onLoggedIn={handleGoToHabits} />} />
                        </Routes>
                    ) : (
                        <Routes>
                            {/* Rutas habiendo hecho login */}
                            <Route path="/" element={<Navigate to="/habits" replace />} />
                            {/* Página principal de Hábitos */}
                            <Route path="/habits" element={<Habits />} />
                            <Route path="/habits/category" element={<HabitCategory />} />
                            <Route path="/habits/category/:category" element={<HabitSelection />} />
                            {/* Otras secciones */}
                            <Route path="/goals" element={<Goals />} />
                            <Route path="/progress" element={<Progress />} />
                            <Route path="/diary" element={<Diary />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    )}
                </main>
                {/* Footer fijo en la parte inferior */}
                {isUserLoggedIn() && <Footer />}
            </div>
        </Context.Provider>
    );
}
