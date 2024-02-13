import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";

const authenticateUser = async (req, res, next) => {
  // Extract the token from the request headers
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied" });
  }

  try {
    // Remove the "Bearer " prefix from the token
    const tokenWithoutBearer = token.replace("Bearer ", "");

    // Verify the token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    // Ensure that the decoded object contains the userId field
    if (!decoded.userId) {
      throw new Error("Invalid token payload: userId not found");
    }

    // Find the user associated with the token
    const foundUser = await user.findById(decoded.userId);
    if (!foundUser) {
      throw new Error("User not found");
    }

    // Attach the user object to the request for further use in the route handlers
    req.user = foundUser;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authenticateUser;
