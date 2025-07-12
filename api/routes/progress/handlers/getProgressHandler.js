import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const getProgressHandler = createFunctionalHandler((req, res) => {
    const { userId } = req;

    return logic.getProgress(userId);
});

export default getProgressHandler;
