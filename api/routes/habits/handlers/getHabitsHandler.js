import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const getHabitsHandler = createFunctionalHandler((req, res) => {
  const { userId } = req;

  return logic.getHabits(userId).then((habits) => res.json(habits));
});

export default getHabitsHandler;
