import { Habit } from 'dat';
import { errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (habitId, userId, { name, emoji }) => {
    return Habit.findById(habitId)
        .catch(error => { throw new SystemError(error.message); })
        .then(habit => {
            if (!habit) throw new NotFoundError('Habit not found');

            if (habit.user.toString() !== userId) throw new SystemError('Unauthorized');

            if (name) habit.name = name;
            if (emoji) habit.emoji = emoji;

            return habit.save()
                .catch(error => { throw new SystemError(error.message); });
        });
};