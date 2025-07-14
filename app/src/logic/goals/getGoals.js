import { errors } from 'com';
import getUserId from '../users/getUserId.js';

const { SystemError } = errors;

export default async function getGoals() {
    try {
        const userId = getUserId();
        
        if (!userId) {
            console.error('Usuario no autenticado - userId:', userId);
            throw new Error('Usuario no autenticado');
        }

        const response = await fetch(`http://localhost:3000/goals?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al obtener metas');
        }

        const data = await response.json();
        return data.goals || data; // Manejar tanto {goals: [...]} como array directo
    } catch (error) {
        throw error;
    }
}
