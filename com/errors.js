const createCustomError = name =>
    class extends Error {
        constructor(message) {
            super(message)

            this.name = name
        }

        static get name() { return name }
    }

const errors = {
    ValidationError: createCustomError('Error de Validación'),
    NotFoundError: createCustomError('Error de No Encontrado'),
    DuplicityError : createCustomError('Error de Duplicidad'),
    CredentialsError: createCustomError('Error de Credenciales'),
    SystemError: createCustomError('Error del Sistema'),
    OwnershipError: createCustomError('Error de Propiedad'),
    AuthorizationError: createCustomError('Error de Autorización')

}

export default errors