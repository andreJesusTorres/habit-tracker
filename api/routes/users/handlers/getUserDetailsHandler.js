import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const getUserDetailsHandler = createFunctionalHandler((req, res) => {
    const userId = req.user.id;

    return logic.getUserDetails({ userId });
});

export default getUserDetailsHandler;