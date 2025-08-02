import { validate, errors, handleApiError } from 'com';

const { SystemError } = errors;

export default (goalId) => {
    validate.id(goalId);

    return fetch(`http://${import.meta.env.VITE_API_URL}/goals/${goalId}`, {
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
                .then(({ error, message }) => { handleApiError(error, message); });
        });
};
