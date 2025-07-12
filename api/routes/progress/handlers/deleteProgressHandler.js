import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteProgressHandler = createFunctionalHandler((req, res) => {
    const { progressId } = req.params;  // progressId viene en la URL
    const { habitId } = req.body; // habitId viene en el body

    return logic.deleteProgress(progressId, habitId);
});

export default deleteProgressHandler;