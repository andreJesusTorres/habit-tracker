import { errors, handleApiError } from 'com';

const { SystemError } = errors;

export default () => {
    return fetch(`http://localhost:3000/events`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .catch(error => { throw new SystemError(error.message); })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { throw new SystemError(error.message); });

            return res.json()
                .catch(error => { throw new SystemError(error.message); })
                .then(({ error, message }) => { handleApiError(error, message); });
        });
};