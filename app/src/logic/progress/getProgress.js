import { errors } from 'com';

const { SystemError } = errors;

export default (habitId, startDate, endDate) => {
    let url = `http://localhost:3000/progress`;
    const params = new URLSearchParams();
    
    if (habitId) {
        params.append('habitId', habitId);
    }
    
    if (startDate) {
        params.append('startDate', startDate);
    }
    
    if (endDate) {
        params.append('endDate', endDate);
    }
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    return fetch(url, {
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
