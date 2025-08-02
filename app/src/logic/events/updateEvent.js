import { validate, errors, handleApiError } from 'com';

const { SystemError } = errors;

export default (eventId, updates) => {
    validate.id(eventId);
    validate.object(updates);

    return fetch(`http://${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    })
        .catch(error => { throw new SystemError(error.message); })
        .then(res => {
            if (res.ok)
                return;

            return res.json()
                .catch(error => { throw new SystemError(error.message); })
                .then(({ error, message }) => { handleApiError(error, message); });
        });
};