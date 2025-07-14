import { Progress } from 'dat';
import { validate, errors } from 'com';

const { SystemError } = errors;

export default (habitId, startDate, endDate) => {
    if (habitId) {
        validate.id(habitId, 'habitId');
    }

    let query = {};
    
    if (habitId) {
        query.habit = habitId;
    }
    
    if (startDate && endDate) {
        query.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    return Progress.find(query)
        .lean()
        .catch(error => { throw new SystemError(error.message); });
};
