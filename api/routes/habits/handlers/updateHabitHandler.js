import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const updateHabitHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { name, emoji } = req.body;
  const { habitId } = req.params;

  return logic.updateHabit(userId, habitId, { name, emoji });
});

export default updateHabitHandler;