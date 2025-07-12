import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const getProgressHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { date } = req.query;

  return logic.getProgress(userId, date);
});

export default getProgressHandler;
