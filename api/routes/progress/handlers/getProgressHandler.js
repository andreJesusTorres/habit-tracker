import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const getProgressHandler = createFunctionalHandler((req, res) => {
  const { habitId, startDate, endDate } = req.query;

  return logic.getProgress(habitId, startDate, endDate);
});

export default getProgressHandler;
