import Employee from "../models/Employee.js";

export const getAllEmployees = async (req, res) => {
    try {
        const { search } = req.query;
        let filter = {};
        if (search && search.trim() !== "") {
            filter.fullname = { $regex: search, $options: "i" };
        }
        const employees = await Employee.find(filter).sort({ createdAt: -1 });
        res.json(employees);

    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve employees", error });
        console.error("Error retrieving employees:", error);
    }
};