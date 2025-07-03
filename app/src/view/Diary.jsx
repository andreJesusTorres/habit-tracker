import React, { useState } from 'react';
import { Header, Footer, Calendar } from './components';


export default function Diary() {
    const [selectedTime, setSelectedTime] = useState(null);
    const [eventDetails, setEventDetails] = useState({ startTime: '', endTime: '', name: '', description: '' });

    const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);

    const handleTimeClick = (startTime, endTime) => {
        setSelectedTime({ startTime, endTime });
        setEventDetails({ ...eventDetails, startTime, endTime });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleAddEvent = () => {
        console.log('Event added:', eventDetails);
        setSelectedTime(null);
        setEventDetails({ startTime: '', endTime: '', name: '', description: '' });
    };

    return (
        <div className="diary-container min-h-screen flex flex-col p-4">
            <Header title="Diary" />

            <div className="flex-grow">
                <Calendar />
                <div className="flex mt-8">
                    <div className="w-1/12">
                        {hours.map((hour, index) => (
                            <div key={index} className="h-16 border-b border-gray-300 flex items-center justify-center">
                                {hour}
                            </div>
                        ))}
                    </div>
                    <div className="w-11/12">
                        {hours.map((hour, index) => (
                            <div
                                key={index}
                                className="h-16 border-b border-gray-300 cursor-pointer relative"
                                onClick={() => handleTimeClick(hour, hours[index + 1] || `${index + 1}:00`)}
                            >
                                {selectedTime && selectedTime.startTime === hour && (
                                    <div className="p-2 bg-white shadow-md rounded-md absolute top-0 left-0 w-full z-10">
                                        <input
                                            type="text"
                                            name="name"
                                            value={eventDetails.name}
                                            onChange={handleInputChange}
                                            placeholder="Event Name"
                                            className="w-full p-2 border rounded mb-2"
                                        />
                                        <textarea
                                            name="description"
                                            value={eventDetails.description}
                                            onChange={handleInputChange}
                                            placeholder="Event Description"
                                            className="w-full p-2 border rounded mb-2"
                                        />
                                        <button
                                            onClick={handleAddEvent}
                                            className="w-full p-2 bg-blue-500 text-white rounded"
                                        >
                                            Add Event
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}