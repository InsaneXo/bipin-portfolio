import { decodeToken } from "../utils/features.js";
import userModel from "../models/user-model.js";

export const isAutheticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }

    const decoded = decodeToken(token);

    req.user = await userModel.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
