import { errors } from 'com';

const { SystemError } = errors;

export default async function getGoals() {
    try {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
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
        return data.goals;
    } catch (error) {
        throw error;
    }
}
