import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login, Register, Goals, Progress, Habits, Diary, Settings } from './view';
import { HabitCategory, Footer, HabitSelection } from './view/components';
import { isUserLoggedIn } from './logic/users';
import { Context } from './view/useContext';

export default function App() {
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('success');
    const navigate = useNavigate();
    
    const handleGoToHabits = () => {
        navigate('/habits');
    };

    const alert = (msg, type = 'success') => {
        setAlertMessage(msg);
        setAlertType(type);
        setTimeout(() => setAlertMessage(null), 3000);
    };

    const getAlertStyles = () => {
        const baseStyles = "fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-50 text-lg font-medium transition-all duration-300 ease-in-out";
        
        switch (alertType) {
            case 'error':
                return `${baseStyles} bg-red-500 text-white border-l-4 border-red-700`;
            case 'warning':
                return `${baseStyles} bg-yellow-500 text-white border-l-4 border-yellow-700`;
            case 'info':
                return `${baseStyles} bg-blue-500 text-white border-l-4 border-blue-700`;
            default:
                return `${baseStyles} bg-green-500 text-white border-l-4 border-green-700`;
        }
    };

    return (
        <Context.Provider value={{ alert }}>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Mensaje de alerta mejorado */}
                {alertMessage && (
                    <div className={getAlertStyles()}>
                        <div className="flex items-center space-x-2">
                            {alertType === 'success' && <span>✅</span>}
                            {alertType === 'error' && <span>❌</span>}
                            {alertType === 'warning' && <span>⚠️</span>}
                            {alertType === 'info' && <span>ℹ️</span>}
                            <span>{alertMessage}</span>
                        </div>
                    </div>
                )}
                
                <main className="flex-grow pb-20">
                    {!isUserLoggedIn() ? (
                        <Routes>
                            <Route path="/" element={<Navigate to="/register" replace />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login onLoggedIn={handleGoToHabits} />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={<Navigate to="/habits" replace />} />
                            <Route path="/habits" element={<Habits />} />
                            <Route path="/habits/category" element={<HabitCategory />} />
                            <Route path="/habits/category/:category" element={<HabitSelection />} />
                            <Route path="/goals" element={<Goals />} />
                            <Route path="/progress" element={<Progress />} />
                            <Route path="/diary" element={<Diary />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    )}
                </main>
                
                {/* Footer mejorado */}
                {isUserLoggedIn() && <Footer />}
            </div>
        </Context.Provider>
    );
}
