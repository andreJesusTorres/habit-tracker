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
                .then(habits => {
                    setHabits(habits);
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert("Error: Inténtalo más tarde.");
                    else
                        alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    }, [selectedDate]);

    const isDateInPast = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate < today;
    };

    const handleCompleteHabit = (habitId) => {
        if (isDateInPast(selectedDate)) {
            alert('No puedes marcar progreso en fechas pasadas.');
            return;
        }

        try {
            const userId = logic.getUserId();
            
            logic.addProgress(userId, habitId, selectedDate.toISOString().split('T')[0], 'done')
                .then((response) => {
                    alert('¡Hábito marcado como completado!');
                    // Recargar solo la lista de hábitos
                    logic.getHabits(selectedDate)
                        .then(habits => {
                            setHabits(habits);
                        })
                        .catch(error => {
                            // Error silencioso al recargar hábitos
                        });
                })
                .catch(error => {
                    alert(error.message || 'Error al marcar hábito como completado');
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleFailHabit = (habitId) => {
        if (isDateInPast(selectedDate)) {
            alert('No puedes marcar progreso en fechas pasadas.');
            return;
        }

        try {
            const userId = logic.getUserId();
            
            logic.addProgress(userId, habitId, selectedDate.toISOString().split('T')[0], 'missed')
                .then((response) => {
                    alert('¡Hábito marcado como no completado!');
                    // Recargar solo la lista de hábitos
                    logic.getHabits(selectedDate)
                        .then(habits => {
                            setHabits(habits);
                        })
                        .catch(error => {
                            console.log('Error al recargar hábitos:', error);
                        });
                })
                .catch(error => {
                    alert(error.message || 'Error al marcar hábito como no completado');
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteHabit = (habitId, habitName) => {
        // Verificar si el hábito tiene progreso en esta fecha
        const habit = habits.find(h => h._id === habitId);
        const hasProgress = habit && (habit.isCompleted || habit.isFailed);
        
        if (hasProgress) {
            // Si tiene progreso, ofrecer 3 opciones
            const choice = window.prompt(
                `¿Qué quieres hacer con "${habitName}"?\n\n` +
                `Escribe el número de la opción:\n` +
                `1 = Eliminar solo el progreso de ${selectedDate.toLocaleDateString('es-ES')}\n` +
                `2 = Eliminar el hábito completamente (todas las fechas)\n` +
                `3 = Cancelar (no hacer nada)\n\n` +
                `Tu elección (1, 2 o 3):`
            );
            
            if (choice === null) {
                return; // Usuario cerró el prompt
            }
            
            const option = choice.trim();
            
            if (option === '1') {
                // Eliminar solo el progreso de esta fecha
                handleDeleteProgress(habitId, habitName);
            } else if (option === '2') {
                // Eliminar el hábito completamente
                const confirmDelete = confirm(
                    `¿Estás seguro de que quieres eliminar el hábito "${habitName}" completamente?\n\n` +
                    `Esta acción eliminará el hábito y todo su historial de progreso de todas las fechas.\n` +
                    `Esta acción no se puede deshacer.`
                );
                
                if (confirmDelete) {
                    handleDeleteHabitCompletely(habitId, habitName);
                }
            } else if (option === '3') {
                // Cancelar
                return;
            } else {
                // Opción inválida
                alert('Opción inválida. Por favor, escribe 1, 2 o 3.');
            }
        } else {
            // Si no tiene progreso, preguntar si eliminar el hábito completamente
            const confirmDelete = confirm(
                `¿Estás seguro de que quieres eliminar el hábito "${habitName}" completamente?\n\n` +
                `Esta acción eliminará el hábito y todo su historial de progreso.\n` +
                `Esta acción no se puede deshacer.`
            );
            
            if (!confirmDelete) {
                return;
            }
            
            // Eliminar el hábito completamente
            handleDeleteHabitCompletely(habitId, habitName);
        }
    };

    const handleDeleteProgress = (habitId, habitName) => {
        try {
            // Buscar el progreso específico para esta fecha
            const habit = habits.find(h => h._id === habitId);
            const progressId = habit?.progressId;
            
            if (!progressId) {
                alert('No se encontró el progreso para eliminar. ID de progreso es nulo o indefinido.');
                return;
            }
            
            logic.deleteProgress(progressId, habitId)
                .then((response) => {
                    alert(`¡Progreso de "${habitName}" eliminado exitosamente!`);
                    // Recargar solo la lista de hábitos
                    logic.getHabits(selectedDate)
                        .then(habits => {
                            setHabits(habits);
                        })
                        .catch(error => {
                            // Error silencioso al recargar hábitos
                        });
                })
                .catch(error => {
                    alert(error.message || 'Error al eliminar progreso');
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteHabitCompletely = (habitId, habitName) => {
        try {
            logic.deleteHabit(habitId)
                .then(() => {
                    alert(`¡Hábito "${habitName}" eliminado completamente!`);
                    // Recargar solo la lista de hábitos
                    logic.getHabits(selectedDate)
                        .then(habits => setHabits(habits))
                        .catch(error => {
                            // Error silencioso al recargar hábitos
                        });
                })
                .catch(error => {
                    alert(error.message || 'Error al eliminar hábito');
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const getDaysArray = () => {
        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = -3; i <= 3; i++) {
            const newDate = new Date();
            newDate.setDate(selectedDate.getDate() + i);
            const checkDate = new Date(newDate);
            checkDate.setHours(0, 0, 0, 0);

            days.push({
                date: newDate.getDate(),
                dayName: newDate.toLocaleDateString('es-ES', { weekday: 'short' }),
                isActive: newDate.toDateString() === selectedDate.toDateString(),
                isPast: checkDate < today,
                fullDate: newDate
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
                            onClick={() => setSelectedDate(day.fullDate)}
                            className={`px-3 py-2 rounded-full text-center transition-all ${
                                day.isActive 
                                    ? 'bg-blue-500 text-white' 
                                    : day.isPast
                                    ? 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                    : 'bg-gray-200 text-black hover:bg-gray-300'
                            }`}>
                            {day.dayName.toUpperCase()}<br/>{day.date}
                        </button>
                    ))}
                </div>

                {/* Indicador de fecha en el pasado */}
                {isDateInPast(selectedDate) && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded mb-4 text-center">
                        📅 Modo de solo lectura: Estás viendo una fecha pasada. Puedes ver el historial pero no marcar progreso.
                    </div>
                )}

                {/* Lista de hábitos */}
                <ul className="space-y-4">
                    {habits.length > 0 ? (
                        habits.map(habit => (
                            <li key={habit._id} className={`flex justify-between items-center px-4 py-2 rounded-lg transition-colors duration-300 ${
                                habit.isCompleted 
                                    ? 'bg-green-100 border-2 border-green-300' 
                                    : habit.isFailed
                                    ? 'bg-red-100 border-2 border-red-300'
                                    : 'bg-gray-100'
                            }`}>
                                <span className={`${
                                    habit.isCompleted 
                                        ? 'text-green-800 font-medium' 
                                        : habit.isFailed
                                        ? 'text-red-800 font-medium'
                                        : ''
                                }`}>
                                    {habit.name}
                                </span>
                                <div className="flex gap-2">
                                    {habit.isCompleted ? (
                                        <>
                                            <span className="text-green-600 text-2xl">✅</span>
                                            <button
                                                onClick={() => handleDeleteHabit(habit._id, habit.name)}
                                                className="text-gray-500 text-xl hover:text-red-600 hover:scale-110 transition-transform"
                                                title="Eliminar hábito"
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    ) : habit.isFailed ? (
                                        <>
                                            <span className="text-red-600 text-2xl">❌</span>
                                            <button
                                                onClick={() => handleDeleteHabit(habit._id, habit.name)}
                                                className="text-gray-500 text-xl hover:text-red-600 hover:scale-110 transition-transform"
                                                title="Eliminar hábito"
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleCompleteHabit(habit._id)}
                                                className="text-green-600 text-2xl hover:scale-110 transition-transform"
                                                title="Completar hábito"
                                            >
                                                ✅
                                            </button>
                                            <button
                                                onClick={() => handleFailHabit(habit._id)}
                                                className="text-red-600 text-2xl hover:scale-110 transition-transform"
                                                title="Marcar como no completado"
                                            >
                                                ❌
                                            </button>
                                            <button
                                                onClick={() => handleDeleteHabit(habit._id, habit.name)}
                                                className="text-gray-500 text-xl hover:text-red-600 hover:scale-110 transition-transform"
                                                title="Eliminar hábito"
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    )}
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
