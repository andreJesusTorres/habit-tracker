import React, { useState, useEffect } from 'react';
import { Header, Footer, Calendar } from './components';
import addEvent from '../logic/events/addEvent';
import getEvents from '../logic/events/getEvents';
import deleteEvent from '../logic/events/deleteEvent';

export default function Diary() {
    const [eventDetails, setEventDetails] = useState({ 
        name: '', 
        description: '', 
        startTime: '', 
        endTime: '' 
    });
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadEvents();
    }, [selectedDate]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            setError('');
            const eventsData = await getEvents();
            setEvents(eventsData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!eventDetails.name.trim()) {
            setError('El nombre del evento es requerido');
            return;
        }
        if (!eventDetails.startTime || !eventDetails.endTime) {
            setError('Por favor selecciona hora de inicio y fin');
            return;
        }
        // Validación de rango horario
        if (eventDetails.startTime >= eventDetails.endTime) {
            alert('La hora de inicio debe ser menor a la de finalización');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const dateObj = new Date(selectedDate);
            const [startHour, startMinute] = eventDetails.startTime.split(':').map(Number);
            const [endHour, endMinute] = eventDetails.endTime.split(':').map(Number);
            
            const startDateTime = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), startHour, startMinute));
            const endDateTime = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), endHour, endMinute));

            await addEvent(
                eventDetails.name,
                startDateTime.toISOString(),
                eventDetails.description,
                endDateTime.toISOString()
            );

            // Recargar todos los eventos para asegurar sincronización
            await loadEvents();
            setEventDetails({ name: '', description: '', startTime: '', endTime: '' });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            setLoading(true);
            setError('');
            await deleteEvent(eventId);
            await loadEvents();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    };

    // Filtrar eventos por fecha seleccionada
    const filteredEvents = events.filter(event => {
        try {
            const eventStart = new Date(event.startDate);
            if (isNaN(eventStart.getTime())) {
                return false;
            }
            
            const eventDate = eventStart.toISOString().split('T')[0];
            const selectedDateStr = new Date(selectedDate).toISOString().split('T')[0];
            
            return eventDate === selectedDateStr;
        } catch (error) {
            return false;
        }
    });

    return (
        <div className="diary-container min-h-screen flex flex-col p-4">
            <Header title="Diario" />

            <div className="flex-grow">
                <div className="mt-8">
                    <Calendar onDateSelect={setSelectedDate} selectedDate={selectedDate} />
                </div>
                
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="mt-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">
                        Agregar Evento para {new Date(selectedDate).toLocaleDateString('es-ES')}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre del Evento
                                </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={eventDetails.name}
                                            onChange={handleInputChange}
                                    placeholder="Ingresa el nombre del evento"
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hora de Inicio
                                </label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={eventDetails.startTime}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hora de Fin
                                </label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={eventDetails.endTime}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción
                                </label>
                                        <textarea
                                            name="description"
                                            value={eventDetails.description}
                                            onChange={handleInputChange}
                                    placeholder="Ingresa la descripción del evento"
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Agregando Evento...' : 'Agregar Evento'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">
                        Events for {new Date(selectedDate).toLocaleDateString()}
                    </h3>
                    
                    {filteredEvents.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No events for this date</p>
                    ) : (
                        <div className="space-y-3">
                            {filteredEvents.map((event) => (
                                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md border">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg">{event.name}</h4>
                                            <p className="text-sm font-semibold text-blue-700 mt-1 mb-2">
                                                {formatTime(event.startDate)} - {formatTime(event.endDate)}
                                            </p>
                                            {event.description && (
                                                <p className="text-gray-600">{event.description}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('¿Estás seguro que quieres eliminar este evento?')) {
                                                    handleDeleteEvent(event._id);
                                                }
                                            }}
                                            disabled={loading}
                                            className="ml-4 text-red-500 hover:text-red-700 disabled:opacity-50"
                                        >
                                            Delete
                                        </button>
                                    </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}