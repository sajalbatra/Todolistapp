import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registeruser = async (req, res) => {
    const { fullName, email, username, password } = req.body;

    try {
        // Check if all required fields are provided
        if (!fullName || !email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existinguser = await user.findOne({ $or: [{ username }, { email }] });
        if (existinguser) {
            return res.status(400).json({ message: "user with email or username already exists" });
        }

        // Create a new user
        const newuser = new user({
            fullName,
            email,
            username: username.toLowerCase(),
            password
        });

        // Save the new user to the database
        await newuser.save();

        return res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
        console.error("Error while registering user:", error);
        return res.status(500).json({ message: "Something went wrong while registering the user" });
    }
};

const loginUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if username or email is provided
        if (!username && !email) {
            return res.status(400).json({ message: "username or email is required" });
        }

        // Find the user by email or username
        const foundUser = await user.findOne({ $or: [{ username }, { email }] });
        if (!foundUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Compare the provided password with the hashed password from the database
        if (password !== foundUser.password) {
            return res.status(401).json({ message: "Invalid user credentials" });
        }


        // Passwords match, proceed with login process
        // Send response accordingly (e.g., token generation, session handling)
        return res.status(200).json({ message: "User logged in successfully", user: foundUser });
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({ message: "Something went wrong while logging in" });
    }
};

// Add other controller functions: changeCurrentPassword, getCurrentuser, updateAccountDetails

const changeCurrentPassword=async (req,res)=>{
    const {email,password,newpassword}=req.body;
    
    try{
      if(!email && !password){
        return res.status(404).json({message:"All details are required"});
      }
      const founduser=await user.findOne({email});
      if(!founduser){
        return res.status(404).json({ message: "user does not exist" });
      }

      if (password !== founduser.password) {
        // console.log(password);
        // console.log(founduser.password);
        return res.status(401).json({ message: "Invalid user credentials" });
      }else{
        founduser.password = newpassword;
        await founduser.save();

        return res.status(200).json({ message: "Password changed successfully" });
    
    }
} catch (error) {
        console.error("Error while changing password:", error);
        return res.status(500).json({ message: "Something went wrong while changing password" });
    }
} 


const getCurrentUser = async (req, res) => {
  try {
      // Retrieve the user details from the request object
      const currentUser = req.user;
      // Return the current user details in the response
      return res.status(200).json({ user: currentUser });
  } catch (error) {
      console.error("Error while fetching current user:", error);
      return res.status(500).json({ message: "Something went wrong while fetching the current user" });
  }
};

const updateAccountDetails = async (req, res) => {
  try {
      // Retrieve the updated details from the request body
      const { fullName, email } = req.body;

      // Check if all required fields are provided
      if (!fullName || !email) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Retrieve the user ID from the request object
      const userId = req.user._id;

      // Find the user by ID and update their details
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { fullName, email } },
          { new: true }
      ).select("-password");

      // Return the updated user details in the response
      return res.status(200).json({ message: "Account details updated successfully", user: updatedUser });
  } catch (error) {
      console.error("Error while updating account details:", error);
      return res.status(500).json({ message: "Something went wrong while updating account details" });
  }
};


export {
    registeruser,
    loginUser,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
};
