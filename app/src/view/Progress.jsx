import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components';
import { getHabits } from '../logic/habits';
import { getProgress } from '../logic/progress';

export default function Progress() {
    const [habits, setHabits] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [progressData, setProgressData] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Load habits on component mount
    useEffect(() => {
        loadHabits();
    }, []);

    // Load progress when habit or month changes
    useEffect(() => {
        if (selectedHabit) {
            loadProgress();
        }
    }, [selectedHabit, currentMonth, currentYear]);

    const loadHabits = async () => {
        try {
            setLoading(true);
            const habitsData = await getHabits();
            setHabits(habitsData);
            if (habitsData.length > 0) {
                setSelectedHabit(habitsData[0]._id);
            }
        } catch (error) {
            alert('Error al cargar hábitos: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadProgress = async () => {
        if (!selectedHabit) return;

        try {
            // Calculate start and end dates for the current month
            const startDate = new Date(currentYear, currentMonth, 1);
            const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

            const progressData = await getProgress(
                selectedHabit,
                startDate.toISOString(),
                endDate.toISOString()
            );

            // Convert progress data to a format suitable for the calendar
            const progressMap = {};
            progressData.forEach(progress => {
                const dateStr = new Date(progress.date).toISOString().split('T')[0];
                progressMap[dateStr] = progress.status;
            });

            setProgressData(progressMap);
        } catch (error) {
            setProgressData({});
        }
    };

    const handleHabitChange = (event) => {
        setSelectedHabit(event.target.value);
    };

    const handleMonthChange = (direction) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const getDayClass = (day) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const status = progressData[dateStr];
        
        if (status === 'done') {
            return 'bg-green-200 border-green-400';
        } else if (status === 'missed') {
            return 'bg-red-200 border-red-400';
        }
        return 'bg-white border-gray-300';
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    if (loading) {
        return (
            <div className="progress-container min-h-screen flex flex-col">
                <Header title="Seguimiento de Progreso" />
                <div className="flex-grow p-4 flex items-center justify-center">
                    <div className="text-lg">Cargando hábitos...</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="progress-container min-h-screen flex flex-col">
            <Header title="Seguimiento de Progreso" />

            <div className="flex-grow p-4">
                {/* Habit Selector */}
                <div className="habit-selector mb-6">
                    <label htmlFor="habit-select" className="block mb-2 text-lg font-semibold">
                        Seleccionar Hábito a Seguir:
                    </label>
                    <select
                        id="habit-select"
                        value={selectedHabit || ''}
                        onChange={handleHabitChange}
                        className="p-3 border border-gray-300 rounded-lg w-full text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {habits.map(habit => (
                            <option key={habit._id} value={habit._id}>
                                {habit.emoji} {habit.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Progress Calendar */}
                {selectedHabit && (
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center mb-6">
                                <button 
                                    onClick={() => handleMonthChange(-1)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    &lt;
                                </button>
                                                            <h2 className="text-xl font-bold">
                                {new Date(currentYear, currentMonth).toLocaleString('es-ES', { month: 'long' })} {currentYear}
                            </h2>
                                <button 
                                    onClick={() => handleMonthChange(1)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    &gt;
                                </button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {/* Week days header */}
                                {weekDays.map((day, index) => (
                                    <div key={index} className="font-bold text-center p-2 text-sm text-gray-600">
                                        {day}
                                    </div>
                                ))}
                                
                                {/* Empty cells for days before the first day of the month */}
                                {Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null).map((_, index) => (
                                    <div key={`empty-${index}`} className="p-2"></div>
                                ))}
                                
                                {/* Days of the month */}
                                {Array.from({ length: daysInMonth }, (_, index) => (
                                    <div 
                                        key={index} 
                                        className={`p-2 border rounded-lg text-center text-sm font-medium transition-colors ${getDayClass(index + 1)}`}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>

                            {/* Legend */}
                            <div className="mt-6 flex justify-center space-x-4 text-sm">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-green-200 border border-green-400 rounded mr-2"></div>
                                    <span>Completado</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-red-200 border border-red-400 rounded mr-2"></div>
                                    <span>Fallido</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                                    <span>Sin Progreso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!selectedHabit && habits.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        No se encontraron hábitos. ¡Crea algunos hábitos primero!
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}