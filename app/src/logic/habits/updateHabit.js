import { validate, errors } from 'com';

const { SystemError } = errors;

export default (habitId, updates) => {
    validate.id(habitId);
    validate.object(updates);

    return fetch(`http://${import.meta.env.VITE_API_URL}/habits/${habitId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
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
                .then(({ error, message }) => { throw new errors[error](message); });
        });
};
