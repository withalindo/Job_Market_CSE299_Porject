import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Required during signup
    },
    fullname: {
        type: String, // Optional for additional details
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, // Required during signup
    },
    phoneNumber: {
        type: String,
    },
    collegeOrUniversity: {
        type: String,
    },
    address: {
        type: String,
    },
    district: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other",
    },
    birthdate: {
        type: Date,
    },
    profileImage: {
        type: String, // URL or path to the uploaded image
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;