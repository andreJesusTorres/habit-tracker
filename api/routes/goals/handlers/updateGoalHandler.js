import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const updateGoalHandler = createFunctionalHandler((req, res) => {
    const { goalId, name, objective, period} = req.body;
    const userId = req.userId;

    return logic.updateGoal( userId, goalId, {name, objective: Number(objective), period }).then(( )=>res.status(200).send()).catch(error=>res.status(500).send(error.message))
});

export default updateGoalHandler;
