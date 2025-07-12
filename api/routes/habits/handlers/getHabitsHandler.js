import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const getHabitsHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { date } = req.query;

  return logic.getHabits(userId, date);
});

export default getHabitsHandler;
