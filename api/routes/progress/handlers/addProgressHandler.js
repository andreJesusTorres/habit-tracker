import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addProgressHandler = createFunctionalHandler((req, res) => {
    const { userId, habitId, date, status  } = req.body;
    console.log("req.body:", req.body)

    return logic.addProgress( userId, habitId, date, status );
});

export default addProgressHandler;
