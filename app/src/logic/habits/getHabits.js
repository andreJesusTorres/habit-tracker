import { errors } from 'com';

const { SystemError } = errors;

export default (date) => {
    const url = date ? `http://localhost:3000/habits?date=${date.toISOString().split('T')[0]}` : `http://localhost:3000/habits`;
    
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .catch(error => { 
            throw new SystemError(error.message); 
        })
        .then(res => {
            if (res.ok) {
                return res.json()
                    .then(data => {
                        return data.habits || data; // Si data.habits no existe, devolver data directamente
                    })
                    .catch(error => { 
                        throw new SystemError(error.message); 
                    });
            }

            return res.json()
                .catch(error => { 
                    throw new SystemError(error.message); 
                })
                .then(({ error, message }) => { 
                    throw new errors[error](message); 
                });
        });
};
