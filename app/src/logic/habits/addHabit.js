import { validate, errors, handleApiError } from 'com';

const { SystemError } = errors;

export default (name, category, subcategory, emoji) => {
    validate.text(name);
    validate.text(category);
    validate.text(subcategory);
    validate.text(emoji);

    return fetch(`http://localhost:3000/habits`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category, subcategory, emoji }),
    })
        .catch(error => { 
            throw new SystemError(error.message); 
        })
        .then(res => {
            if (res.ok)
                return res.json()
                    .catch(error => { 
                        throw new SystemError(error.message); 
                    });

            return res.json()
                .catch(error => { 
                    throw new SystemError(error.message); 
                })
                .then(({ error, message }) => { 
                    handleApiError(error, message);
                });
        });
};
