import { redirect } from "react-router-dom";
import Company from "../models/Company.js";
import bcrypt from "bcrypt";

// Company Signup Controller
export const signupCompany = async (req, res) => {
  const { companyName, email, password } = req.body;

  if (!companyName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company
    const newCompany = new Company({
      companyName,
      email,
      password: hashedPassword,
    });

    await newCompany.save();
    res.status(201).json({ 
      message: "Successfully created a company account. Welcome aboard!",
      redirectUrl: "http://localhost:5173/PostSignupEmp"
     });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({ message: "Email already exists. Please use a different email." });
    } else {
      console.error("Error creating company:", error);
      res.status(500).json({ message: "Internal server error. Please try again later." });
    }
  }
};