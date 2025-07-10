import { validate, errors } from 'com';
import getUserId from '../users/getUserId.js';

const { SystemError } = errors;

export default (habitId, progressDetails) => {
    validate.id(habitId);
    validate.object(progressDetails);

    const userId = getUserId();

    return fetch(`http://localhost:3000/progress`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            userId, 
            habitId, 
            date: progressDetails.date || new Date().toISOString().split('T')[0],
            status: progressDetails.status 
        }),
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
