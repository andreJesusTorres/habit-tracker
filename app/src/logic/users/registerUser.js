import { validate, errors }  from 'com'

const { SystemError } = errors

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return fetch(`http://localhost:3000/users/register`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, username, password, passwordRepeat})
    })
        .catch(error => { 
            throw new SystemError(error.message) 
        })
        .then(res => {
            if (res.ok) {
                return res.json()
                    .catch(() => ({ message: 'Usuario registrado exitosamente' }));
            }

            return res.json()
                .catch(error => { 
                    throw new SystemError(error.message) 
                })
                .then(({ error, message}) => { 
                    if (errors[error]) {
                        throw new errors[error](message);
                    } else {
                        throw new SystemError(message || 'Error desconocido');
                    }
                })
        })
}