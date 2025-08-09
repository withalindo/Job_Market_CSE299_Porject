import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Only allow employee login
        const user = await Employee.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        req.session.user = user._id;

        const token = jwt.sign({ id: user._id, type: "employee" }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({ message: "Login successful", token, userType: "employee" });
        console.log("Employee login:", username);

    } catch (err) {
        console.error("Login error: ", err);
        res.status(500).json({ message: "Internal server error. Our developer team is working really hard to resolve the problem" });
    }
};