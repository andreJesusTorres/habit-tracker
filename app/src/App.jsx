import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login, Register, Goals, Progress, Habits, Diary, Settings } from './view';
import { HabitCategory, Footer, HabitSelection } from './view/components';
import { isUserLoggedIn } from './logic/users';

export default function App() {

    const navigate = useNavigate()
    const handleGoToHabits= ()=>{
        navigate('/habits')
    }
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                {!isUserLoggedIn()?
                <Routes>{/* Lo primero que se ve es Register */}
                <Route path="/" element={<Navigate to="/register" replace />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLoggedIn={handleGoToHabits}/>} /> </Routes>
                :
                <Routes>{/* Rutas habiendo hecho logiun*/ }  
                <Route path="/" element={<Navigate to="/habits" replace />} />
                {/* Página principal de Hábitos */}
                <Route path="/habits" element={<Habits />} />
                <Route path="/habits/category" element={<HabitCategory />} />
                <Route path="/habits/category/:category" element={<HabitSelection/>}/>

                {/* Otras secciones */}
                <Route path="/goals" element={<Goals />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/settings" element={<Settings />} />

                {/* Redirección por defecto */}
                
            </Routes>
            }
                    

                   
            </main>

            {/* Footer fijo en la parte inferior */}
            {isUserLoggedIn()&&<Footer />}
        </div>
    );
}
