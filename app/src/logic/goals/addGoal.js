import { validate, errors } from 'com';

const { SystemError } = errors;

export default (habitId, description, period, objective) => {
    validate.id(habitId);
    validate.text(description);
    validate.text(period);
    validate.number(objective);

    return fetch(`http://${import.meta.env.VITE_API_URL}/goals`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habitId, description, period, objective }),
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
