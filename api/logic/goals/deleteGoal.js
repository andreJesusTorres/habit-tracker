import { Goal } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId, goalId) => {
    validate.id(userId, 'userId');
    validate.id(goalId, 'goalId');

    return Goal.findOne({ _id: goalId, user: userId })
        .catch(error => { throw new SystemError(error.message); })
        .then(goal => {
            if (!goal) throw new NotFoundError('Goal not found');

            return Goal.findByIdAndDelete(goalId)
                .then(() => {
                    return { message: 'Goal eliminado correctamente', goalId };
                })
                .catch(error => { throw new SystemError(error.message); });
        });
};
