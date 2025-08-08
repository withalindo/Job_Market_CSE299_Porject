import Job from "../models/Job.js";

// Get all jobs, with optional search and category filter
export const getJobs = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category && category !== "All") {
      filter.category = category;
    }

    const jobs = await Job.find(filter).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};