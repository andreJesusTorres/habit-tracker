import { Progress } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError, OwnershipError } = errors;

export default (progressId, habitId) => {
    validate.id(progressId, 'progressId');
    validate.id(habitId, 'habitId');

    return Promise.all([
        Progress.findById(progressId).lean()
    ])
        .catch(error => { throw new SystemError(error.message); })
        .then(([progress]) => {
            if (!progress) throw new NotFoundError('Progress not found');
            if (progress.habit.toString() !== habitId) throw new OwnershipError('Progress does not belong to the given habit');

            return Progress.findByIdAndDelete(progressId)
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(() => { }); // Successful deletion
};
