import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

export const VerifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).json({ error: "Forbidden" });

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await UserModel.findById(payload._id).select("-password");
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
