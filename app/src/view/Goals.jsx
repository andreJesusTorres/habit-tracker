import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components';
import addGoal from '../logic/goals/addGoal';
import getGoals from '../logic/goals/getGoals';
import getHabits from '../logic/habits/getHabits';

export default function Goals() {
    const [habits, setHabits] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState('');
    const [targetDays, setTargetDays] = useState(22);
    const [objective, setObjective] = useState(7);
    const [goalName, setGoalName] = useState('');
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);

    const selectedHabitData = habits.find(habit => habit._id === selectedHabit);

    // Cargar hábitos y metas existentes
    useEffect(() => {
        loadHabits();
        loadGoals();
    }, []);

    const loadHabits = async () => {
        try {
            const habitsData = await getHabits(new Date());
            setHabits(habitsData);
            // Seleccionar el primer hábito por defecto si hay hábitos disponibles
            if (habitsData.length > 0 && !selectedHabit) {
                setSelectedHabit(habitsData[0]._id);
            }
        } catch (error) {
            console.error('Error cargando hábitos:', error);
        }
    };

    const loadGoals = async () => {
        try {
            const goalsData = await getGoals();
            setGoals(goalsData);
        } catch (error) {
            console.error('Error cargando metas:', error);
        }
    };

    const handleHabitChange = (event) => {
        setSelectedHabit(event.target.value);
    };

    const handleCreateGoal = async () => {
        if (!goalName.trim()) {
            window.alert('Por favor ingresa un nombre para la meta');
            return;
        }

        if (objective <= 0 || targetDays <= 0) {
            window.alert('Los valores deben ser números positivos');
            return;
        }

        if (objective > targetDays) {
            window.alert('El objetivo no puede ser mayor que el número de días');
            return;
        }

        if (!selectedHabit) {
            window.alert('Por favor selecciona un hábito');
            return;
        }

        setLoading(true);
        try {
            const goalData = {
                name: goalName,
                period: 'custom',
                objective: objective,
                targetDays: targetDays
            };

            await addGoal(selectedHabit, goalData);
            window.alert('¡Meta creada exitosamente!');
            
            // Limpiar formulario
            setGoalName('');
            setTargetDays(22);
            setObjective(7);
            
            // Recargar metas
            await loadGoals();
        } catch (error) {
            window.alert(error.message || 'Error al crear meta');
        } finally {
            setLoading(false);
        }
    };

    const getProgressBarColor = (percentage) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        if (percentage >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="goals-container min-h-screen flex flex-col">
            <Header title="Goals" />

            <div className="flex-grow p-4">
                <div className="habit-selector mb-4">
                    <label htmlFor="habit-select" className="block mb-2 text-lg font-medium">Choose Habit:</label>
                    <select
                        id="habit-select"
                        value={selectedHabit}
                        onChange={handleHabitChange}
                        className="p-3 border rounded-lg w-full text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Selecciona un hábito</option>
                        {habits.map(habit => (
                            <option key={habit._id} value={habit._id}>
                                {habit.emoji} {habit.name} ({habit.category})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Información del hábito seleccionado */}
                {selectedHabitData && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-3">
                            <span className="text-3xl">{selectedHabitData.emoji}</span>
                            <div>
                                <h3 className="text-xl font-semibold text-blue-800">{selectedHabitData.name}</h3>
                                <p className="text-blue-600 capitalize">{selectedHabitData.category}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Formulario para crear meta */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Configurar Meta</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre de la meta:
                            </label>
                            <input
                                type="text"
                                value={goalName}
                                onChange={(e) => setGoalName(e.target.value)}
                                placeholder="Ej: Completar 7 días de ejercicio en 22 días"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Días objetivo:
                                </label>
                                <input
                                    type="number"
                                    value={targetDays}
                                    onChange={(e) => setTargetDays(parseInt(e.target.value) || 0)}
                                    min="1"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Veces a completar:
                                </label>
                                <input
                                    type="number"
                                    value={objective}
                                    onChange={(e) => setObjective(parseInt(e.target.value) || 0)}
                                    min="1"
                                    max={targetDays}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                            <p className="text-blue-800 text-sm">
                                <strong>Meta:</strong> Completar {objective} veces "{selectedHabitData?.name}" en {targetDays} días
                            </p>
                        </div>

                        <button
                            onClick={handleCreateGoal}
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creando meta...' : 'Crear Meta'}
                        </button>
                    </div>
                </div>

                {/* Lista de metas existentes */}
                {goals.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Mis Metas</h3>
                        {goals.map((goal) => (
                            <div key={goal._id} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{goal.habit?.emoji}</span>
                                        <div>
                                            <h4 className="font-semibold">{goal.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                {goal.completedCount} de {goal.objective} completados
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            goal.isCompleted ? 'bg-green-100 text-green-800' :
                                            goal.isExpired ? 'bg-red-100 text-red-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {goal.isCompleted ? 'Completada' :
                                             goal.isExpired ? 'Expirada' :
                                             `${goal.daysRemaining} días restantes`}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Barra de progreso */}
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(goal.progressPercentage)}`}
                                        style={{ width: `${goal.progressPercentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    {goal.progressPercentage}% completado
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}