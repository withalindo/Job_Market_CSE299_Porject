import Employee from "../models/Employee.js";
import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        let user = await Employee.findOne({ username: username });
        let userType = "employee";

        if (!user) {
            user = await Company.findOne({ companyName: username }); 
            userType = "company";
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // re
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        //re
        const token = jwt.sign({ id: user._id, type: userType }, process.env.JWT_SECRET,
            {
                expiresIn: "1h"

            });

        res.status(200).json({ message: "Login successful", token, userType });
        console.log("Username provided:", username);
        console.log("Password provided:", password);
        console.log("User found:", user);
        if (user) {
            console.log("Password in database:", user.password);
        }

    }

    catch (err) {
        console.error("Login error: ", err);
        res.status(500).json({ message: "Internal server error. Our developer team is working really hard to reslove the problem" });


    }

};

