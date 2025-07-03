import { Event } from 'dat';
import { validate, errors } from 'com';

const { SystemError } = errors;

export default (userId) => {
    validate.id(userId, 'userId');
    

    return Event.find({ user: userId})
        .lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(events => events)
};
