import { Goal, User } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId, habitId, name, period, objective) => {
    validate.id(userId, 'userId');
    validate.id(habitId, 'habitId');
   
   

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
            if (!user) throw new NotFoundError('User not found');

            const goal = new Goal({
                user: userId,
                habit: habitId,
                name: name,
                period: period,
                objective: objective
            });

            return goal.save()
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(goal => goal._id);
};