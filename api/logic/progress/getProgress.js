import { Progress } from 'dat';
import { validate, errors } from 'com';

const { SystemError } = errors;

export default (habitId) => {
    validate.id(habitId, 'habitId');
   

    return Progress.find({ habit: habitId })
        .lean()
        .catch(error => { throw new SystemError(error.message); });
        
};
