
import { Event } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (eventId, userId) => {
    try {
        validate.id(eventId, 'eventId');
        validate.id(userId, 'userId');
    } catch (error) {
        throw error;
    }

    return Event.findById(eventId).lean()
        .catch(error => { 
            console.log('🔍 Backend - FindById error:', error.message);
            throw new SystemError(error.message); 
        })
        .then(event => {
            if (!event) throw new NotFoundError('Event not found');
            
            // Validar que el evento pertenezca al usuario
            if (event.user.toString() !== userId) {
                throw new errors.AuthorizationError('Event does not belong to user');
            }
            
            return Event.deleteOne({ _id: eventId })
                .catch(error => { 
                    throw new SystemError(error.message); 
                });
        });
};