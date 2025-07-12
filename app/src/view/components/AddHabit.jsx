import React, { useState } from 'react';

export default function AddHabit({ onAddHabit }) {
    const [habit, setHabit] = useState({ name: '', emoji: '', category: '', subcategory: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setHabit({ ...habit, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddHabit(habit);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={habit.name} onChange={handleChange} required />
            <input name="emoji" placeholder="Emoji" value={habit.emoji} onChange={handleChange} maxLength="10" required />
            <select name="category" value={habit.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="salud y bienestar">Salud y Bienestar</option>
                <option value="actividad física">Actividad Física</option>
                <option value="desarrollo personal">Desarrollo Personal</option>
            </select>
            <input name="subcategory" placeholder="Subcategory" value={habit.subcategory} onChange={handleChange} required />
            <button type="submit">Add Habit</button>
        </form>
    );
}
