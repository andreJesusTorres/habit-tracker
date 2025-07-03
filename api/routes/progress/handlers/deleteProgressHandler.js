import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteProgressHandler = createFunctionalHandler((req, res) => {
    const { progressId} = req.params;  // Solo habitId viene en el body
    const { habitId } = req; // progressId viene en la URL

   
    return logic.deleteProgress(progressId, habitId);
});


export default deleteProgressHandler;