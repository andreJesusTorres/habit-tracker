import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const getUserDetailsHandler = createFunctionalHandler((req, res) => {
    return logic.getUserDetails({ userId: req.user.id });
});

export default getUserDetailsHandler;