import { Habit, Progress } from 'dat';
import { validate, errors } from 'com';

const { SystemError, ValidationError } = errors;

export default async (userId, date) => {
    console.log('🔔 Debug - getHabits logic called with:', { userId, date });
    
    validate.id(userId, 'userId');
    
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

    console.log('🔔 Debug - Date range for progress search:', { startOfDay, endOfDay });

    console.log('🔔 Debug - Validation passed, fetching habits and progress...');

    try {
        // Primero obtener los hábitos del usuario
        const habits = await Habit.find({ user: userId }).lean();
        console.log('🔔 Debug - Raw habits found:', habits.length);
        
        // Obtener los IDs de los hábitos
        const habitIds = habits.map(habit => habit._id);
        
        // Buscar progresos para esos hábitos en el rango de fechas
        const progresses = await Progress.find({
            habit: { $in: habitIds },
            date: { $gte: startOfDay, $lte: endOfDay }
        }).lean();

        console.log('🔔 Debug - Raw progresses found:', progresses.length);
        console.log('🔔 Debug - Raw progresses:', progresses);
        
        // Crear un mapa de progresos por habitId para acceso rápido
        const progressMap = {};
        progresses.forEach(progress => {
            progressMap[progress.habit.toString()] = progress;
        });

        console.log('🔔 Debug - Progress map:', progressMap);

        // Combinar hábitos con su progreso correspondiente
        const result = habits.map(habit => {
            const progress = progressMap[habit._id.toString()];
            const habitWithProgress = {
                ...habit,
                isCompleted: progress ? progress.status === 'done' : false,
                isFailed: progress ? progress.status === 'missed' : false,
                progressId: progress ? progress._id : null
            };
            console.log('🔔 Debug - Habit processed:', {
                habitId: habit._id,
                name: habit.name,
                isCompleted: habitWithProgress.isCompleted,
                isFailed: habitWithProgress.isFailed,
                progressId: habitWithProgress.progressId
            });
            return habitWithProgress;
        });

        console.log('🔔 Debug - Final result:', result);
        return result;
    } catch (error) {
        console.error('🔔 Debug - Error in getHabits:', error);
        throw new SystemError(error.message);
    }
};