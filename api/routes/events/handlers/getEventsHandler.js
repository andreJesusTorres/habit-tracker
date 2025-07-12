import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

const getEventsHandler = createFunctionalHandler((req, res) => {
  const userId = req.user.id;
  const { date } = req.query;

  return logic.getEvents(userId, date);
});

export default getEventsHandler;
