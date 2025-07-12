
import { Event } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (eventId) => {
    console.log('🔍 Backend - Deleting event with ID:', eventId, 'Length:', eventId?.length);
    console.log('🔍 Backend - EventId type:', typeof eventId);
    console.log('🔍 Backend - EventId value:', JSON.stringify(eventId));
    
    try {
    validate.id(eventId, 'eventId');
        console.log('🔍 Backend - Validation passed');
    } catch (error) {
        console.log('🔍 Backend - Validation failed:', error.message);
        throw error;
    }

    return Event.findById(eventId).lean()
        .catch(error => { 
            console.log('🔍 Backend - FindById error:', error.message);
            throw new SystemError(error.message); 
        })
        .then(event => {
            console.log('🔍 Backend - Event found:', event ? 'YES' : 'NO');
            if (event) {
                console.log('🔍 Backend - Event details:', JSON.stringify(event));
            }
            if (!event) throw new NotFoundError('Event not found');
            
            return Event.deleteOne({ _id: eventId })
                .catch(error => { 
                    console.log('🔍 Backend - DeleteOne error:', error.message);
                    throw new SystemError(error.message); 
                })
                .then(result => {
                    console.log('🔍 Backend - Delete result:', JSON.stringify(result));
                    return result;
                });
        });
};