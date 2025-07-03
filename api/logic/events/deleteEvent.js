import { Event } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (eventId) => {
    validate.id(eventId, 'eventId');

    return Event.findById(eventId).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(event => {
            if (!event) throw new NotFoundError('Event not found');
            
            return Event.deleteOne({ _id: eventId })
                .catch(error => { throw new SystemError(error.message); });
        });
};