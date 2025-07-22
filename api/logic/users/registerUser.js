import bcrypt from 'bcryptjs';

import { User } from 'dat';
import { validate, errors } from 'com';

const { DuplicityError, SystemError } = errors;

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name);
    validate.email(email);
    validate.username(username);
    validate.password(password);
    validate.passwordsMatch(password, passwordRepeat);

   return bcrypt.hash(password, 10)
    .catch(error => { throw new SystemError(error.message) })
    .then(hash =>
        User.create({ name, email, username, password: hash })
            .then(user => user)
            .catch(error => {
                if (error.code === 11000) throw new DuplicityError('el usuario ya existe')

                throw new SystemError(error.message)
            })
    )
}