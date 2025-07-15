import { Goal } from 'dat';

export default async function addGoal(userId, habitId, goalData) {
    try {
        const { name, period, objective, targetDays } = goalData;
        
        // Validar datos requeridos
        if (!name || !period || !objective || !targetDays) {
            throw new Error("Todos los campos son requeridos: name, period, objective, targetDays");
        }

        // Validar que objective sea un número positivo
        if (objective <= 0) {
            throw new Error("El objetivo debe ser un número positivo");
        }

        // Validar que targetDays sea un número positivo
        if (targetDays <= 0) {
            throw new Error("El período de días debe ser un número positivo");
        }
ç
        // Crear la meta
        const goal = new Goal({
            user: userId,
            habit: habitId,
            name,
            period,
            objective,
            targetDays,
            startDate: new Date(),
            endDate: new Date(Date.now() + (targetDays * 24 * 60 * 60 * 1000)), // targetDays en milisegundos
            completedCount: 0
        });

        await goal.save();
        return goal;
    } catch (error) {
        throw error;
    }
}