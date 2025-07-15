import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login, Register, Goals, Progress, Habits, Diary, Settings } from './view';
import { HabitCategory, Footer, HabitSelection } from './view/components';
import { isUserLoggedIn } from './logic/users';
import { Context } from './view/useContext';

export default function App() {
    const navigate = useNavigate();
    
    const handleGoToHabits = () => {
        navigate('/habits');
    };

    const alert = (msg, type = 'success') => {
        window.alert(msg);
    };



    return (
        <Context.Provider value={{ alert }}>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                
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
