import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

const updateUserHandler = createFunctionalHandler(async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;
    return logic.updateUser(userId, { name, email });
});

export default updateUserHandler; 