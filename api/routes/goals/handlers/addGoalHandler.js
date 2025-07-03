import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addGoalHandler = createFunctionalHandler((req, res) => {
    const { userId, habitId, name, period, objective} = req.body;
    

    return logic.addGoal( userId, habitId, name, period, objective ).then(( )=>res.status(200).send()).catch(error=>res.status(500).send(error.message))
});

export default addGoalHandler;
