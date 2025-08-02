import jwt from "jsonwebtoken";
import logic from "../../../logic/index.js";
import { createFunctionalHandler } from "../../helpers/index.js";

export default createFunctionalHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await logic.authenticateUser(username, password);

  return {
    token: result.token,
    userId: result.user.id,
    role: result.user.role
  };
});
