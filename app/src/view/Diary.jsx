import React, { useState, useEffect } from 'react';
import { Header, Footer, Calendar } from './components';
import addEvent from '../logic/events/addEvent';
import getEvents from '../logic/events/getEvents';
import deleteEvent from '../logic/events/deleteEvent';
import { useNotifications } from './hooks/useNotifications.jsx';

export default function Diary() {
    const { alert } = useNotifications();
    const [eventDetails, setEventDetails] = useState({ 
        name: '', 
        description: '', 
        startTime: '', 
        endTime: '',
        hasTime: true
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
        const { name, value, type, checked } = e.target;
        setEventDetails({ 
            ...eventDetails, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!eventDetails.name.trim()) {
            setError('El nombre del evento es requerido');
            return;
        }
        if (eventDetails.hasTime) {
            if (!eventDetails.startTime || !eventDetails.endTime) {
                setError('Por favor selecciona hora de inicio y fin');
                return;
            }
            // Validación de rango horario
            if (eventDetails.startTime >= eventDetails.endTime) {
                alert('La hora de inicio debe ser menor a la de finalización', 'warning');
                return;
            }
        }

        try {
            setLoading(true);
            setError('');

            const dateObj = new Date(selectedDate);
            
            let startDateTime, endDateTime;
            
            if (eventDetails.hasTime) {
                const [startHour, startMinute] = eventDetails.startTime.split(':').map(Number);
                const [endHour, endMinute] = eventDetails.endTime.split(':').map(Number);
                
                // Crear fechas en la zona horaria local del usuario
                startDateTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), startHour, startMinute);
                endDateTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), endHour, endMinute);
            } else {
                // Para eventos sin horario, usar todo el día
                startDateTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0);
                endDateTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59);
            }

            await addEvent(
                eventDetails.name,
                startDateTime.toISOString(),
                eventDetails.description,
                endDateTime.toISOString()
            );

            // Recargar todos los eventos para asegurar sincronización
            await loadEvents();
            setEventDetails({ name: '', description: '', startTime: '', endTime: '', hasTime: true });
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
            alert('Evento eliminado exitosamente', 'success');
        } catch (error) {
            alert(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (eventId) => {
        if (confirm('¿Estás seguro que quieres eliminar este evento?')) {
            handleDeleteEvent(eventId);
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Si es 00:00, probablemente es un evento sin horario
        if (hours === 0 && minutes === 0) {
            return 'Todo el día';
        }
        
        // Usar las horas locales directamente, sin conversión de zona horaria
        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        return `${hoursStr}:${minutesStr}`;
    };

    // Filtrar eventos por fecha seleccionada
    const filteredEvents = events.filter(event => {
        try {
            const eventStart = new Date(event.startDate);
            if (isNaN(eventStart.getTime())) {
                return false;
            }
            
            // Usar fechas locales para la comparación
            const eventDate = eventStart.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD
            const selectedDateStr = new Date(selectedDate).toLocaleDateString('en-CA');
            
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
                            <div className="md:col-span-2">
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
                            
                            <div className="md:col-span-2">
                                <label className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="checkbox"
                                        name="hasTime"
                                        checked={eventDetails.hasTime}
                                        onChange={handleInputChange}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Evento con horario específico
                                    </span>
                                </label>
                            </div>
                            
                            {eventDetails.hasTime && (
                                <>
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
                                            required={eventDetails.hasTime}
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
                                            required={eventDetails.hasTime}
                                        />
                                    </div>
                                </>
                            )}
                            
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
                        Eventos para {new Date(selectedDate).toLocaleDateString('es-ES')}
                    </h3>
                    
                    {filteredEvents.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No hay eventos para esta fecha</p>
                    ) : (
                        <div className="space-y-3">
                            {filteredEvents.map((event) => (
                                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md border">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg">{event.name}</h4>
                                            <p className="text-sm font-semibold text-blue-700 mt-1 mb-2">
                                                {formatTime(event.startDate) === 'Todo el día' 
                                                    ? 'Todo el día' 
                                                    : `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`
                                                }
                                            </p>
                                            {event.description && (
                                                <p className="text-gray-600">{event.description}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => confirmDelete(event._id)}
                                            disabled={loading}
                                            className="ml-4 text-red-500 hover:text-red-700 disabled:opacity-50"
                                        >
                                            Eliminar
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