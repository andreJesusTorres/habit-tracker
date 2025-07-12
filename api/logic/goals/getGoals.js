import { Goal, Habit, Progress } from "../../../dat/models.js";

export default async function getGoals(userId) {
    try {
        // Obtener todas las metas del usuario con información del hábito
        const goals = await Goal.find({ user: userId })
            .populate('habit', 'name emoji category')
            .lean();

        // Filtrar metas que tengan hábitos válidos (no null)
        const validGoals = goals.filter(goal => goal.habit !== null);

        // Para cada meta válida, calcular el progreso actual
        const goalsWithProgress = await Promise.all(validGoals.map(async (goal) => {
            // Contar cuántas veces se ha completado el hábito desde la fecha de inicio de la meta
            const completedCount = await Progress.countDocuments({
                habit: goal.habit._id,
                status: 'done',
                date: { 
                    $gte: goal.startDate,
                    $lte: goal.endDate
                }
            });

            // Calcular el progreso como porcentaje
            const progressPercentage = Math.min((completedCount / goal.objective) * 100, 100);
            
            // Calcular días restantes
            const now = new Date();
            const daysRemaining = Math.max(0, Math.ceil((goal.endDate - now) / (1000 * 60 * 60 * 24)));

            return {
                ...goal,
                completedCount,
                progressPercentage: Math.round(progressPercentage),
                daysRemaining,
                isActive: now >= goal.startDate && now <= goal.endDate,
                isCompleted: completedCount >= goal.objective,
                isExpired: now > goal.endDate
            };
        }));

        return goalsWithProgress;
    } catch (error) {
        throw error;
    }
}
