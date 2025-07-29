import Employee from "../models/Employee.js"; 
import bcrypt from "bcrypt";

// Employee Signup Controller
export const signupEmployee = async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ message: "All fields are required" });
        
    }

    try {

        // Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new employee
        const newEmployee = new Employee({
            username,
            email,
            password: hashedPassword,
        });

        await newEmployee.save();
        res.status(201).json({message:"Successfully created a fresh employee account. All the best :)"});

    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ message: "Internal server error. Our developer team is working hard to resolve the problem. Thanks for your Patience", error });
    }
};
