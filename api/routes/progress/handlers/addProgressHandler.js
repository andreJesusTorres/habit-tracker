import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addProgressHandler = createFunctionalHandler((req, res) => {
    console.log('🔔 Debug - addProgressHandler called');
    console.log('🔔 Debug - req.body:', req.body);
    
    const { userId, habitId, date, status } = req.body

    console.log('🔔 Debug - Extracted data:', { userId, habitId, date, status });

    return logic.addProgress(userId, habitId, date, status)
        .then(result => {
            console.log('🔔 Debug - logic.addProgress result:', result);
            return result;
        })
        .catch(error => {
            console.error('🔔 Debug - logic.addProgress error:', error);
            throw error;
        });
})

export default addProgressHandler
