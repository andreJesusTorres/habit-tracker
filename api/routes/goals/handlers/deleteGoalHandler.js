import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const deleteGoalHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { goalId } = req.params;

  return logic.deleteGoal(userId, goalId);
});

export default deleteGoalHandler;
