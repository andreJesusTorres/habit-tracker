import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const addGoalHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { habitId, name, period, objective, targetDays } = req.body;

  const goalData = {
    name,
    period,
    objective,
    targetDays
  };

  return logic.addGoal(userId, habitId, goalData);
});

export default addGoalHandler;
