import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const addGoalHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { name, description, targetDate } = req.body;

  return logic.addGoal(userId, name, description, targetDate);
});

export default addGoalHandler;
