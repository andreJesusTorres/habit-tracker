import errors from "./errors.js";

const { ValidationError } = errors;

const validateName = (name) => {
  if (typeof name !== "string") throw new ValidationError("nombre inválido");
  if (name.length < 2) throw new ValidationError("longitud de nombre inválida");
};

const validateEmail = (email) => {
  if (typeof email !== "string") throw new ValidationError("email inválido");
  if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  )
    throw new ValidationError("email inválido");
};

const validateUsername = (username) => {
  if (typeof username !== "string")
    throw new ValidationError("nombre de usuario inválido");
  if (username.length < 3 || username.length > 30)
    throw new ValidationError("longitud de nombre de usuario inválida");
};

const validatePassword = (password) => {
  if (typeof password !== "string")
    throw new ValidationError("contraseña inválida");
  if (password.length < 8) throw new ValidationError("longitud de contraseña inválida");
};

const validatePasswordsMatch = (password, passwordRepeat) => {
  if (typeof passwordRepeat !== "string")
    throw new ValidationError("repetición de contraseña inválida");
  if (password !== passwordRepeat)
    throw new ValidationError("las contraseñas no coinciden");
};

const validateImage = (image) => {
  if (typeof image !== "string") throw new ValidationError("imagen inválida");
  if (image.trim().length === 0)
    throw new ValidationError("longitud de imagen inválida");
};

const validateText = (text) => {
  if (typeof text !== "string") throw new ValidationError("texto inválido");
  if (text.trim().length === 0)
    throw new ValidationError("longitud de texto inválida");
};

const validateId = (id, explain = "id") => {
  if (typeof id !== "string") throw new ValidationError(`${explain} inválido`);
  if (id.length !== 24) throw new ValidationError(`longitud de ${explain} inválida`);
};

const validateCallback = (callback) => {
  if (typeof callback !== "function")
    throw new ValidationError("función de callback inválida");
};

const validateEmoji = (emoji) => {
  if (typeof emoji !== "string") throw new ValidationError("emoji inválido");
  if (emoji.length > 20) throw new ValidationError("longitud de emoji inválida");
};

const validate = {
  name: validateName,
  email: validateEmail,
  username: validateUsername,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
  image: validateImage,
  text: validateText,
  id: validateId,
  callback: validateCallback,
  emoji: validateEmoji,
};

export default validate;
