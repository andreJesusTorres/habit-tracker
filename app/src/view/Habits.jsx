import { useEffect, useState } from "react";
import { Button } from "./library";
import {Footer,DayCircle} from "./components";
import { useNavigate } from "react-router-dom";
import logic from "../logic";

export default function Habits() {
    const [habits, setHabits] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        try {
            logic.getHabits(selectedDate)
                .then(habits => setHabits(habits))
                .catch(error => {
                    if (error instanceof SystemError)
                        alert("Error: Inténtalo más tarde.");
                    else
                        alert(error.message);
                    console.error(error);
                });
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }, [selectedDate]);

    const getDaysArray = () => {
        const days = [];
        for (let i = -3; i <= 3; i++) {
            const newDate = new Date();
            newDate.setDate(selectedDate.getDate() + i);

            days.push({
                date: newDate.getDate(),
                dayName: newDate.toLocaleDateString('es-ES', { weekday: 'short' }),
                isActive: newDate.toDateString() === selectedDate.toDateString(),
            });
        }
        return days;
    };

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <main className="flex-grow px-4 py-6">
                {/* Título */}
                <h1 className="text-2xl font-bold text-center mb-2">Hábitos</h1>
                <div className="border-t-2 border-gray-300 w-full mx-auto mb-4"></div>

                {/* Días de la semana navegables */}
                <div className="flex justify-center items-center gap-3 mb-6 overflow-hidden">
                    {getDaysArray().map((day, index) => (
                        <button 
                            key={index} 
                            onClick={() => setSelectedDate(new Date(new Date().setDate(day.date)))}
                            className={`px-3 py-2 rounded-full text-center ${day.isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {day.dayName.toUpperCase()}<br/>{day.date}
                        </button>
                    ))}
                </div>

                {/* Lista de hábitos */}
                <ul className="space-y-4">
                    {habits.length > 0 ? (
                        habits.map(habit => (
                            <li key={habit.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg">
                                <span>{habit.name}</span>
                                <div className="flex gap-2">
                                    <button className="text-green-500 text-xl">✔️</button>
                                    <button className="text-red-500 text-xl">❌</button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay hábitos registrados para este día.</p>
                    )}
                </ul>
            </main>

            {/* Línea separadora */}
            <div className="border-t-2 border-gray-300 w-full mx-auto"></div>

            {/* Botón + */}
            <div className="flex justify-center py-4 mb-10">
                <Button className="text-3xl bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg" onClick={() => navigate("/habits/category")}>➕</Button>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
