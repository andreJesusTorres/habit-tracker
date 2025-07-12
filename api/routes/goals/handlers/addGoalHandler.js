import addGoal from '../../../logic/goals/addGoal.js';
import { createFunctionalHandler } from '../../helpers/index.js';

const addGoalHandler = createFunctionalHandler(async (req, res) => {
    const { userId } = req.body;
    const { habitId, name, period, objective, targetDays } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!userId || !habitId || !name || !period || !objective || !targetDays) {
        throw new Error('Todos los campos son requeridos: userId, habitId, name, period, objective, targetDays');
    }

    const goalData = {
        name,
        period,
        objective: parseInt(objective),
        targetDays: parseInt(targetDays)
    };

    const goal = await addGoal(userId, habitId, goalData);

    return {
        message: 'Meta creada exitosamente',
        goal: {
            id: goal._id,
            name: goal.name,
            period: goal.period,
            objective: goal.objective,
            targetDays: goal.targetDays,
            startDate: goal.startDate,
            endDate: goal.endDate
        }
    };
});

export default addGoalHandler;
