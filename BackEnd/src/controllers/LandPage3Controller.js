import Employee from "../models/Employee.js";
import Job from "../models/Job.js";

// Get top 3 employees (most recent)
export const getTopEmployees = async (req, res) => {
	try {
		const employees = await Employee.find().sort({ createdAt: -1 }).limit(3);
		res.json(employees);
	} catch (err) {
		res.status(500).json([]);
	}
};

// Get jobs with highest salary (top 3)
export const getTopJobsBySalary = async (req, res) => {
	try {
		const jobs = await Job.find().sort({ salary: -1 }).limit(3);
		res.json(jobs);
	} catch (err) {
		res.status(500).json([]);
	}
};
