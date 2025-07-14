import { Progress, Habit } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId, habitId, date, status) => {
    validate.id(userId, 'userId');
    validate.id(habitId, 'habitId');
    validate.text(status, 'status');

    return Habit.findOne({ user: userId, _id: habitId }).lean()
        .catch(error => { 
            throw new SystemError(error.message); 
        })
        .then(habit => {
            if (!habit) throw new NotFoundError('Habit not found');

            // Buscar progreso existente para esta fecha y hábito
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            return Progress.findOneAndUpdate(
                {
                    habit: habitId,
                    date: { $gte: startOfDay, $lte: endOfDay }
                },
                {
                habit: habitId,
                    date: new Date(date),
                    status: status,
                },
                {
                    upsert: true, // Crear si no existe, actualizar si existe
                    new: true // Devolver el documento actualizado
                }
            )
                .catch(error => { 
                    throw new SystemError(error.message); 
                });
        })
        .then(progress => {
            return progress._id;
        });
};