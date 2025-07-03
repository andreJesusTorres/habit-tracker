import React, { useState } from 'react';
import { Header, Footer } from '../components'


// Lista de hábitos de ejemplo
const habits = [
    { id: 1, name: 'Exercise' },
    { id: 2, name: 'Reading' },
    { id: 3, name: 'Meditation' },
    // Añade más hábitos según sea necesario
];

export default function Goals() {
    const [selectedHabit, setSelectedHabit] = useState(habits[0].id);

    const handleHabitChange = (event) => {
        setSelectedHabit(parseInt(event.target.value));
    };

    return (
        <div className="goals-container min-h-screen flex flex-col">
            <Header title="Goals" />

            <div className="flex-grow p-4">
                <div className="habit-selector mb-4">
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

                {/* Aquí puedes agregar más elementos según sea necesario */}
            </div>

            <Footer />
        </div>
    );
}