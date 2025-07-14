import { validate, errors } from 'com';

const { SystemError } = errors;

export default (userId, habitId, date, status) => {
    validate.id(userId, 'userId');
    validate.id(habitId, 'habitId');

    return fetch('http://localhost:3000/progress', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, habitId, date, status })
    })
        .catch(error => { 
            throw new SystemError(error.message); 
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(data => {
                    return data;
                }).catch(jsonError => {
                    throw new SystemError('Invalid JSON response from server');
                });
            }

            return res.text().then(text => {
                try {
                    const errorData = JSON.parse(text);
                    throw new errors[errorData.error](errorData.message);
                } catch (parseError) {
                    throw new SystemError(text || 'Unknown server error');
                }
            });
        });
}; 