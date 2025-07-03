import { Progress } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (progressId, userId, updates) => {
    validate.id(progressId, 'progressId');
    validate.id(userId, 'userId');
   

    return Progress.findOne({ _id: progressId})
        .catch(error => {
            throw new SystemError(error.message);
        })
        .then(progress => {
            if (!progress) throw new NotFoundError('Progress not found');

            Object.assign(progress, updates);

            return progress.save()
                .catch(error => {
                    throw new SystemError(error.message);
                });
        })
        .then(progress => progress._id);
};
