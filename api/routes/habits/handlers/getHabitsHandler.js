import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const getHabitsHandler = createFunctionalHandler((req, res) => {
  const { userId } = req;
  const { date } = req.query;

  return logic.getHabits(userId, date).then((habits) => res.json(habits));
});

export default getHabitsHandler;
