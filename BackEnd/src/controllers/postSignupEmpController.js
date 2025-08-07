import { redirect } from 'react-router-dom';
import Employee from '../models/Employee.js';

export const saveEmployeeDetails = async (req, res) => {
    try {
        console.log("Saving employee details...");
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const {
            fullname, // Sent from the frontend
            email,
            phoneNumber,
            collegeOrUniversity,
            address,
            district,
            gender,
            birthdate,
        } = req.body;

        const profileImage = req.file ? req.file.path : null;

        // Validate required fields
        if (!fullname || !email) {
            return res.status(400).json({ message: 'Full name and email are required' });
        }

        // Find the employee by email and update their details
        const updatedEmployee = await Employee.findOneAndUpdate(
            { email }, // Match the employee by email
            {
                fullname, // Add fullname to the schema
                phoneNumber,
                collegeOrUniversity,
                address,
                district,
                gender,
                birthdate,
                profileImage,
                email, // Update email with the previous value
                username: req.body.username, // Update username with the previous value
                password: req.body.password, // Update password with the previous value
            },
            { new: true } 
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee details updated successfully' }
          
        );
    } catch (error) {
        console.error('Error saving employee details:', error.message);
        console.error('Error saving employee details:', error.message);

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'Internal server error', error });
    }
};