import { Event } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (eventId, name, description, startDate, endDate, frequency) => {
    validate.id(eventId, 'eventId');
    validate.text(name, 'name');
    validate.text(description, 'description');
    validate.text(frequency, 'frequency');

    return Event.findById(eventId)
        .catch(error => { throw new SystemError(error.message); })
        .then(event => {
            if (!event) throw new NotFoundError('Event not found');

            event.name = name;
            event.description = description;
            event.startDate = startDate;
            event.endDate = endDate || null;
            event.frequency = frequency;

            return event.save()
                .catch(error => { throw new SystemError(error.message); });
        })
        .then(updatedEvent => updatedEvent._id);
};
