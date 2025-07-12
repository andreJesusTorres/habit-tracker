import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const getGoalsHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { date } = req.query;

  return logic.getGoals(userId, date);
});

export default getGoalsHandler;
