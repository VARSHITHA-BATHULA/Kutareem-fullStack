import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Adjust the path to your User model

export const protect = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;

    // If no token is found, return an error
    if (!token) {
      return res.status(400).json({
        message: "User unauthorized, no token provided",
        success: false,
      });
    }

    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is invalid, return an error
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach the user's ID to the request object for later use
    req.userId = decoded.userId;

    // Get the user from the database based on the userId from the token
    const user = await User.findById(req.userId).select("-password");

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error during the process, return an error response
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
    });
  }
};
