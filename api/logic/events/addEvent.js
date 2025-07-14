import { Event, User } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId, name, startDate, description, endDate = null, frequency = 'once',) => {
    validate.id(userId, 'userId');
    validate.text(name, 'name');
    
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message); })
        .then(user => {
            if (!user) throw new NotFoundError('User not found');

            const event = new Event({
                user: userId,
                name,
                startDate,
                description,
                endDate,
                frequency,
                
            });

            return event.save()
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(event => event._id);
};
