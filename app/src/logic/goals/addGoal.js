import { validate, errors } from 'com';

const { SystemError } = errors;

export default async function addGoal(habitId, goalData) {
    try {
        const response = await fetch('http://localhost:3000/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                habitId,
                ...goalData
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear meta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
