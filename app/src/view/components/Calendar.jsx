import React, { useState } from 'react';

export default function Calendar({ onDateSelect, selectedDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfWeek = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfWeek = getFirstDayOfWeek(currentDate);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateString = clickedDate.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD en zona horaria local
        if (onDateSelect) {
            onDateSelect(dateString);
        }
    };

    const isSelectedDate = (day) => {
        if (!selectedDate) return false;
        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayString = dayDate.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD en zona horaria local
        return dayString === selectedDate;
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-gray-200 rounded"
                    >
                        ←
                    </button>
                    <h2 className="text-lg font-bold">
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h2>
                    <button
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-gray-200 rounded"
                    >
                        →
                    </button>
                </div>
                <div className="grid grid-cols-7 text-center">
                    {weekDays.map((day, index) => (
                        <div key={index} className="font-bold text-sm">
                            {day}
                        </div>
                    ))}
                    {Array(firstDayOfWeek).fill(null).map((_, index) => (
                        <div key={index}></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, index) => {
                        const day = index + 1;
                        const isSelected = isSelectedDate(day);
                        return (
                            <div
                                key={index}
                                onClick={() => handleDateClick(day)}
                                className={`p-2 border rounded cursor-pointer hover:bg-gray-200 ${
                                    isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
                                }`}
                            >
                                {day}
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}