import { validate, errors } from 'com';

const { SystemError } = errors;

export default (eventId) => {
    // Validar que eventId sea una cadena y no esté vacía
    if (typeof eventId !== 'string' || !eventId.trim()) {
        throw new Error('ID de evento inválido');
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