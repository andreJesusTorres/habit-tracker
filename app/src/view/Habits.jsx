import { useEffect, useState } from "react";
import { Button } from "./library";
import { Footer, DayCircle } from "./components";
import { useNavigate } from "react-router-dom";
import logic from "../logic";

export default function Habits() {
    const [habits, setHabits] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadHabits();
    }, [selectedDate]);

    const loadHabits = async () => {
        setLoading(true);
        try {
            const habitsData = await logic.getHabits(selectedDate);
            setHabits(habitsData);
        } catch (error) {
            if (error instanceof SystemError)
                alert("Error: Inténtalo más tarde.");
            else
                alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const isDateInPast = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate < today;
    };

    const handleCompleteHabit = async (habitId) => {
        if (isDateInPast(selectedDate)) {
            alert('No puedes marcar progreso en fechas pasadas.');
            return;
        }

        try {
            const userId = logic.getUserId();
            await logic.addProgress(userId, habitId, selectedDate.toISOString().split('T')[0], 'done');
            alert('¡Hábito marcado como completado!');
            await loadHabits();
        } catch (error) {
            alert(error.message || 'Error al marcar hábito como completado');
        }
    };

    const handleFailHabit = async (habitId) => {
        if (isDateInPast(selectedDate)) {
            alert('No puedes marcar progreso en fechas pasadas.');
            return;
        }

        try {
            const userId = logic.getUserId();
            await logic.addProgress(userId, habitId, selectedDate.toISOString().split('T')[0], 'missed');
            alert('¡Hábito marcado como no completado!');
            await loadHabits();
        } catch (error) {
            alert(error.message || 'Error al marcar hábito como no completado');
        }
    };

    const handleDeleteHabit = (habitId, habitName) => {
        const habit = habits.find(h => h._id === habitId);
        const hasProgress = habit && (habit.isCompleted || habit.isFailed);
        
        if (hasProgress) {
            const choice = window.prompt(
                `¿Qué quieres hacer con "${habitName}"?\n\n` +
                `Escribe el número de la opción:\n` +
                `1 = Eliminar solo el progreso de ${selectedDate.toLocaleDateString('es-ES')}\n` +
                `2 = Eliminar el hábito completamente (todas las fechas)\n` +
                `3 = Cancelar (no hacer nada)\n\n` +
                `Tu elección (1, 2 o 3):`
            );
            
            if (choice === null) return;
            
            const option = choice.trim();
            
            if (option === '1') {
                handleDeleteProgress(habitId, habitName);
            } else if (option === '2') {
                const confirmDelete = confirm(
                    `¿Estás seguro de que quieres eliminar el hábito "${habitName}" completamente?\n\n` +
                    `Esta acción eliminará el hábito y todo su historial de progreso de todas las fechas.\n` +
                    `Esta acción no se puede deshacer.`
                );
                
                if (confirmDelete) {
                    handleDeleteHabitCompletely(habitId, habitName);
                }
            } else if (option === '3') {
                return;
            } else {
                alert('Opción inválida. Por favor, escribe 1, 2 o 3.');
            }
        } else {
            const confirmDelete = confirm(
                `¿Estás seguro de que quieres eliminar el hábito "${habitName}" completamente?\n\n` +
                `Esta acción eliminará el hábito y todo su historial de progreso.\n` +
                `Esta acción no se puede deshacer.`
            );
            
            if (confirmDelete) {
                handleDeleteHabitCompletely(habitId, habitName);
            }
        }
    };

    const handleDeleteProgress = async (habitId, habitName) => {
        try {
            const habit = habits.find(h => h._id === habitId);
            const progressId = habit?.progressId;
            
            if (!progressId) {
                alert('No se encontró el progreso para eliminar. ID de progreso es nulo o indefinido.');
                return;
            }
            
            await logic.deleteProgress(progressId, habitId);
            alert(`¡Progreso de "${habitName}" eliminado exitosamente!`);
            await loadHabits();
        } catch (error) {
            alert(error.message || 'Error al eliminar progreso');
        }
    };

    const handleDeleteHabitCompletely = async (habitId, habitName) => {
        try {
            await logic.deleteHabit(habitId);
            alert(`¡Hábito "${habitName}" eliminado completamente!`);
            await loadHabits();
        } catch (error) {
            alert(error.message || 'Error al eliminar hábito');
        }
    };

    const getDaysArray = () => {
        const days = [];
        const today = new Date();
        
        for (let i = -6; i <= 0; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        
        return days;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const getHabitStatus = (habit) => {
        if (habit.isCompleted) return 'completed';
        if (habit.isFailed) return 'failed';
        return 'pending';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 border-green-500 text-green-700';
            case 'failed': return 'bg-red-100 border-red-500 text-red-700';
            default: return 'bg-gray-100 border-gray-300 text-gray-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return '✅';
            case 'failed': return '❌';
            default: return '⏳';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Mis Hábitos</h1>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        {selectedDate.toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </div>
            </div>

            {/* Calendario de días */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-3">
                    <div className="flex justify-between items-center space-x-2">
                        {getDaysArray().map((date, index) => (
                            <DayCircle
                                key={index}
                                date={date}
                                isSelected={date.toDateString() === selectedDate.toDateString()}
                                onClick={() => setSelectedDate(date)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lista de hábitos */}
            <div className="p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-gray-600">Cargando hábitos...</span>
                    </div>
                ) : habits.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🌟</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes hábitos aún</h3>
                        <p className="text-gray-500 mb-6">Comienza creando tu primer hábito para mejorar tu vida</p>
                        <Button 
                            onClick={() => navigate('/habits/category')}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Crear Primer Hábito
                        </Button>
                    </div>
                ) : (
                    habits.map((habit) => {
                        const status = getHabitStatus(habit);
                        return (
                            <div 
                                key={habit._id} 
                                className={`bg-white rounded-lg shadow-sm border-2 p-4 transition-all duration-200 hover:shadow-md ${getStatusColor(status)}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{habit.emoji}</span>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                                            <p className="text-sm text-gray-500">{habit.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">{getStatusIcon(status)}</span>
                                        <Button
                                            onClick={() => handleDeleteHabit(habit._id, habit.name)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            🗑️
                                        </Button>
                                    </div>
                                </div>

                                {!isDateInPast(selectedDate) && (
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => handleCompleteHabit(habit._id)}
                                            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            ✅ Completado
                                        </Button>
                                        <Button
                                            onClick={() => handleFailHabit(habit._id)}
                                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            ❌ Fallado
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Botón flotante para agregar hábito */}
            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
                <Button
                    onClick={() => navigate('/habits/category')}
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-110"
                >
                    <span className="text-2xl">+</span>
                </Button>
            </div>

            <Footer />
        </div>
    );
}
