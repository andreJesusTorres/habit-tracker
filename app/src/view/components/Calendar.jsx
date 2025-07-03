import React, { useState } from 'react';

export default function Calendar() {
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

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h2>
                </div>
                <div className="grid grid-cols-7 text-center">
                    {weekDays.map((day, index) => (
                        <div key={index} className="font-bold">
                            {day}
                        </div>
                    ))}
                    {Array(firstDayOfWeek).fill(null).map((_, index) => (
                        <div key={index}></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, index) => (
                        <div key={index} className="p-2 border rounded hover:bg-gray-200">
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}