import { validate, errors, handleApiError } from 'com';

const { SystemError } = errors;

export default (habitId, updates) => {
    validate.id(habitId);
    validate.object(updates);

    return fetch(`http://localhost:3000/habits/${habitId}`, {
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
                .then(({ error, message }) => { 
                    handleApiError(error, message);
                });
        });
};
