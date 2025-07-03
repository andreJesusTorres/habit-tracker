import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteGoalHandler = createFunctionalHandler((req, res) => {
     const { goalId } = req.params;
     const { userId } = req 

    return logic.deleteGoal( userId, goalId );
});

export default deleteGoalHandler;
