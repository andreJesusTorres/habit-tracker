import { Habit, User, Progress } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, date) => {
    validate.id(userId, 'userId')
    console.log('Buscando hábitos para userId:', userId, 'fecha:', date)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Habit.find({ user: userId }).lean()
                .then(habits => {
                    // Si no hay fecha específica, solo devolver hábitos
                    if (!date) return habits;

                    // Buscar progreso para la fecha específica
                    const startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    return Progress.find({
                        date: { $gte: startOfDay, $lte: endOfDay }
                    }).lean()
                        .then(progressEntries => {
                            // Crear un mapa de progreso por habitId
                            const progressMap = {};
                            progressEntries.forEach(progress => {
                                progressMap[progress.habit.toString()] = progress.status;
                            });

                            // Agregar información de estado a cada hábito
                            return habits.map(habit => ({
                                ...habit,
                                isCompleted: progressMap[habit._id.toString()] === 'done',
                                isFailed: progressMap[habit._id.toString()] === 'missed'
                            }));
                        });
                });
        })
        .catch(error => { throw new SystemError(error.message) })
}