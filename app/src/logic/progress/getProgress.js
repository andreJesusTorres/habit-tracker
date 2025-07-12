import { errors } from 'com';

const { SystemError } = errors;

export default (habitId) => {
    return fetch(`http://${import.meta.env.VITE_API_URL}/progress/${habitId}`, {
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
                .then(({ error, message }) => { throw new errors[error](message); });
        });
};
