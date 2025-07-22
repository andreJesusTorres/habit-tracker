import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "dat";
import { validate, errors } from "com";

const { SystemError, CredentialsError } = errors;

export default (username, password) => {
  validate.username(username);
  validate.password(password);

  return User.findOne({ username })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new CredentialsError("Credenciales incorrectas");

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) throw new CredentialsError("Credenciales incorrectas");

        const token = jwt.sign(
          { id: user._id.toString(), role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return {
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
          },
        };
      });
    });
};
