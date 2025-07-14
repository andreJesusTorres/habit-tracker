import { validate, errors }  from 'com'

const { SystemError } = errors

export default (username, password) => {
    // Validar datos de entrada
    validate.username(username)
    validate.password(password)
    
    console.log('Intentando login con:', username);

   return fetch(`http://localhost:3000/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
})
    .catch(error => { 
        console.log('Error en fetch:', error);
        throw new SystemError(error.message) 
    })
    .then(res => {
        console.log('Respuesta del servidor:', res.status);
        if (res.ok)
            return res.json()
                .catch(error => { 
                    console.log('Error al parsear JSON:', error);
                    throw new SystemError(error.message) 
                })
                .then(data => { 
                    console.log('Login exitoso, guardando datos');
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userRole', data.role);
                    return data;
                })

            return res.json()
                .catch(error => { 
                    console.log('Error al parsear error JSON:', error);
                    throw new SystemError(error.message) 
                })
                .then(({ error, message }) => { 
                    console.log('Error del servidor:', error, message);
                    throw new errors[error](message) 
                })
    })
}