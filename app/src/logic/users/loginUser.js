import { validate, errors, handleApiError }  from 'com'

const { SystemError } = errors

export default (username, password) => {
    validate.username(username)
    validate.password(password)

   return fetch(`http://localhost:3000/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
})
    .catch(error => { 
        throw new SystemError(error.message) 
    })
    .then(res => {
        if (res.ok)
            return res.json()
                .catch(error => { 
                    throw new SystemError(error.message) 
                })
                .then(data => { 
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userRole', data.role);
                    return data;
                })
        else
            return res.json()
                .catch(error => { 
                    throw new SystemError(error.message) 
                })
                .then(({ error, message }) => { 
                    handleApiError(error, message || 'Error desconocido');
                })
    })
}