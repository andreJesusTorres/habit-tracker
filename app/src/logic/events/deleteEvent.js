import { validate, errors } from 'com';

const { SystemError } = errors;

export default (eventId) => {
    // Validate that eventId is a string and not empty
    if (typeof eventId !== 'string' || !eventId.trim()) {
        throw new Error('Invalid event ID');
    }

    return fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .catch(error => { throw new SystemError(error.message); })
        .then(res => {
            if (res.ok)
                return;

            return res.json()
                .catch(error => { throw new SystemError(error.message); })
                .then(({ error, message }) => { throw new errors[error](message); });
        });
};