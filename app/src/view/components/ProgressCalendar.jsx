import React, { useState } from 'react';

// Helper function to get the days in a month
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the first day of the month
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

const ProgressCalendar = ({ habits, selectedHabit }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Function to handle month change
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

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const currentHabit = habits.find(habit => habit.id === selectedHabit);

    const getDayClass = (day) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (currentHabit && currentHabit.progress[dateStr] !== undefined) {
            return currentHabit.progress[dateStr] ? 'bg-green-200' : 'bg-red-200';
        }
        return '';
    };

    // Days of the week starting from Monday to Sunday
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => handleMonthChange(-1)}>&lt;</button>
                    <h2 className="text-lg font-bold">
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                    </h2>
                    <button onClick={() => handleMonthChange(1)}>&gt;</button>
                </div>
                <div className="grid grid-cols-7 text-center">
                    {weekDays.map((day, index) => (
                        <div key={index} className="font-bold">
                            {day}
                        </div>
                    ))}
                    {Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null).map((_, index) => (
                        <div key={index}></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, index) => (
                        <div key={index} className={`p-2 border rounded ${getDayClass(index + 1)}`}>
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressCalendar;