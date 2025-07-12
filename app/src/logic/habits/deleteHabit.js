import { validate, errors } from 'com';

const { SystemError } = errors;

export default (habitId) => {
    validate.id(habitId);

    return fetch(`http://localhost:3000/habits/${habitId}`, {
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
