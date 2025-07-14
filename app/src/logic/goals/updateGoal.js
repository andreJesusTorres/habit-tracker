import { validate, errors } from 'com';

const { SystemError } = errors;

export default (goalId, updates) => {
    validate.id(goalId);
    validate.object(updates);

    return fetch(`http://${import.meta.env.VITE_API_URL}/goals/${goalId}`, {
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
                .then(({ error, message }) => { throw new errors[error](message); });
        });
};
