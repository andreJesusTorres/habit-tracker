import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const registerUserHandler = createFunctionalHandler((req, res) => {
    const { name, email, username, password, passwordRepeat } = req.body;

    return logic.registerUser( name, email, username, password, passwordRepeat );
});

export default registerUserHandler;