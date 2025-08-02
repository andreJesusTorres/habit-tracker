import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login, Register, Goals, Progress, Habits, Diary, Settings } from './view';
import { HabitCategory, Footer, HabitSelection } from './view/components';
import { isUserLoggedIn } from './logic/users';
import { Context } from './view/useContext';
import { NotificationProvider, useNotifications } from './view/hooks/useNotifications.jsx';
import { useAuth } from './view/hooks/useAuth.jsx';

function AppContent() {
    const navigate = useNavigate();
    const { alert } = useNotifications();
    const { logout } = useAuth();
    
    // Limpiar localStorage al cargar la app para prevenir problemas con tokens antiguos
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                
                if (!payload.id || !payload.exp || payload.exp < currentTime) {
                    console.log('Token inválido detectado al cargar la app, limpiando localStorage');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('userRole');
                }
            } catch (error) {
                console.log('Error al validar token al cargar la app, limpiando localStorage');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
            }
        }
    }, []);
    
    const handleGoToHabits = () => {
        navigate('/habits');
    };



    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <main className="flex-grow pb-20">
                {!isUserLoggedIn() ? (
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
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
    );
}

export default function App() {
    return (
        <NotificationProvider>
            <AppContent />
        </NotificationProvider>
    );
}
