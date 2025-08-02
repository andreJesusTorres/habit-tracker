import { validate, errors, handleApiError } from 'com';

const { SystemError } = errors;

export default (name, startDate, description, endDate = null, frequency = 'once') => {
    validate.text(name);
    validate.text(startDate);
    if (description) validate.text(description);
    if (endDate) validate.text(endDate);
    if (frequency) validate.text(frequency);

    return fetch(`http://localhost:3000/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, startDate, description, endDate, frequency }),
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