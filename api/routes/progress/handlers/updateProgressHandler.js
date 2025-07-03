import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const updateProgressHandler = createFunctionalHandler((req, res) => {
    const {status } = req.body;
    const userId = req.userId;
    const {progressId} = req.params

    return logic.updateProgress(progressId, userId, {status, date: new Date()}).then(( )=>res.status(200).send()).catch(error=>res.status(500).send(error.message))
});

export default updateProgressHandler;