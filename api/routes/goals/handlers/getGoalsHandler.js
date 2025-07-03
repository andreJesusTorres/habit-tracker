import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const getGoalsHandler = createFunctionalHandler((req, res) => {
    const { userId } = req;

  return logic.getGoals(userId).then((goals) => res.json(goals));
});

export default getGoalsHandler;
