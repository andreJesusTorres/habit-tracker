import React, { useState } from 'react';
import { Header, Footer, ProgressCalendar } from './components';


// Lista de hábitos de ejemplo
const habits = [
    { id: 1, name: 'Exercise', progress: { '2025-02-01': true, '2025-02-02': false, '2025-02-03': true } },
    { id: 2, name: 'Reading', progress: { '2025-02-01': true, '2025-02-02': true, '2025-02-03': false } },
    // Añade más hábitos según sea necesario
];

export default function Progress() {
    const [selectedHabit, setSelectedHabit] = useState(habits[0].id);

    const handleHabitChange = (event) => {
        setSelectedHabit(parseInt(event.target.value));
    };

    return (
        <div className="progress-container min-h-screen flex flex-col">
            <Header title="Progress Tracker" />

            <div className="flex-grow p-4">
                <ProgressCalendar habits={habits} selectedHabit={selectedHabit} />

                <div className="habit-selector mt-4">
                    <label htmlFor="habit-select" className="block mb-2">Choose Habit:</label>
                    <select
                        id="habit-select"
                        value={selectedHabit}
                        onChange={handleHabitChange}
                        className="p-2 border rounded w-full"
                    >
                        {habits.map(habit => (
                            <option key={habit.id} value={habit.id}>
                                {habit.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <Footer />
        </div>
    );
}