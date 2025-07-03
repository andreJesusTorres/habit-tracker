import { Progress, Habit } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId, habitId, date, status) => {
    validate.id(userId, 'userId');
    validate.id(habitId, 'habitId');
    validate.text(status, 'status');

    return Habit.findOne({ user: userId, _id: habitId }).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(habit => {
            if (!habit) throw new NotFoundError('Habit not found');

            const progress = new Progress({
                user: userId,
                habit: habitId,
                date,
                status,
            });

            return progress.save()
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(progress => progress._id);
};