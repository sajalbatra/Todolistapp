import { Router } from "express";
import { 
    loginUser,
    registeruser, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails
} from "../controllers/auth.controller.js";

const router = Router();

// Route to handle user login
router.post("/login", loginUser);
router.post("/register",registeruser);
// Route to change user password (requires JWT authentication)
router.post("/change-password", changeCurrentPassword);

// Route to get current user details (requires JWT authentication)
router.get("/current-user", getCurrentUser);

// Route to update user account details (requires JWT authentication)
router.patch("/update-account", updateAccountDetails);


export default router;
