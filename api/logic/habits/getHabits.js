import { Habit, Progress } from 'dat';
import { validate, errors } from 'com';

const { SystemError, ValidationError } = errors;

export default async (userId, date) => {
    validate.id(userId, 'userId');
    
    // Si no se proporciona fecha, devolver solo los hábitos sin progreso
    if (!date) {
        try {
            const habits = await Habit.find({ user: userId }).lean();
            return habits.map(habit => ({
                ...habit,
                isCompleted: false,
                isFailed: false,
                progressId: null
            }));
        } catch (error) {
            throw new SystemError(error.message);
        }
    }
    
    // Validación simple para la fecha
    if (typeof date !== 'string' && !(date instanceof Date)) {
        throw new ValidationError('invalid date');
    }

    // Calcular rango de fecha para todo el día (igual que en addProgress)
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    try {
        // Primero obtener los hábitos del usuario
        const habits = await Habit.find({ user: userId }).lean();
        
        // Obtener los IDs de los hábitos
        const habitIds = habits.map(habit => habit._id);
        
        // Buscar progresos para esos hábitos en el rango de fechas
        const progresses = await Progress.find({
            habit: { $in: habitIds },
            date: { $gte: startOfDay, $lte: endOfDay }
        }).lean();
            
            // Crear un mapa de progresos por habitId para acceso rápido
            const progressMap = {};
            progresses.forEach(progress => {
                progressMap[progress.habit.toString()] = progress;
            });

            // Combinar hábitos con su progreso correspondiente
            const result = habits.map(habit => {
                const progress = progressMap[habit._id.toString()];
            return {
                    ...habit,
                    isCompleted: progress ? progress.status === 'done' : false,
                    isFailed: progress ? progress.status === 'missed' : false,
                    progressId: progress ? progress._id : null
                };
        });

            return result;
    } catch (error) {
        throw new SystemError(error.message);
    }
};